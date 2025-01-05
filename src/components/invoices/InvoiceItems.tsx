import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { InvoiceItem } from "@/types/invoice";
import { InvoiceItemCard } from "./InvoiceItemCard";
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
}

export const InvoiceItems = ({ items, onItemsChange }: InvoiceItemsProps) => {
  const form = useFormContext();
  const businessType = form?.watch?.("businessType") || "freelancing";
  const taxes = form?.watch?.("taxes") || [{ name: "No Tax", rate: "0" }];
  
  const defaultDescription = businessType === "freelancing" ? "Service 1" : "Product 1";

  const [newItem, setNewItem] = useState<Partial<InvoiceItem>>({
    description: defaultDescription,
    quantity: 1,
    price: 0,
    tax: 0,
    image: null
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewItem(prev => ({ ...prev, image: file }));
    }
  };

  const handleAddItem = () => {
    if (!newItem.description) return;
    
    const itemToAdd: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: newItem.description || "",
      quantity: newItem.quantity || 1,
      price: newItem.price || 0,
      amount: (newItem.quantity || 1) * (newItem.price || 0),
      image: newItem.image
    };

    onItemsChange([...items, itemToAdd]);
    setNewItem({
      description: defaultDescription,
      quantity: 1,
      price: 0,
      image: null
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <InvoiceItemCard
            key={item.id}
            item={item}
            onUpdate={(id, field, value) => {
              const updatedItems = items.map(item => {
                if (item.id === id) {
                  const updatedItem = { ...item, [field]: value };
                  if (['quantity', 'price'].includes(field)) {
                    updatedItem.amount = Number(updatedItem.quantity) * Number(updatedItem.price);
                  }
                  return updatedItem;
                }
                return item;
              });
              onItemsChange(updatedItems);
            }}
            onImageUpload={(id, event) => {
              const file = event.target.files?.[0];
              const updatedItems = items.map(item => 
                item.id === id ? { ...item, image: file } : item
              );
              onItemsChange(updatedItems);
            }}
            selectedCurrency={form?.watch?.("currency") || "NGN"}
          />
        ))}
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-medium mb-4">Add New Item</h3>
        <div className="flex gap-4 items-start">
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="item-description">Item Description</Label>
              <Input
                id="item-description"
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter item description"
                className="mt-2"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="item-quantity">Quantity</Label>
                <Input
                  id="item-quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                  min={1}
                  className="mt-2"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="item-price">Price</Label>
                <Input
                  id="item-price"
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem(prev => ({ ...prev, price: Number(e.target.value) }))}
                  min={0}
                  step="0.01"
                  className="mt-2"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="item-tax">Tax</Label>
                <Select 
                  value={(newItem.tax || "0").toString()}
                  onValueChange={(value) => setNewItem(prev => ({ ...prev, tax: Number(value) }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select tax" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxes.map((tax, index) => (
                      <SelectItem key={index} value={tax.rate}>
                        {tax.name} ({tax.rate}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="item-amount">Amount</Label>
                <Input
                  id="item-amount"
                  type="number"
                  value={(newItem.quantity || 0) * (newItem.price || 0)}
                  readOnly
                  className="mt-2 bg-gray-50"
                />
              </div>
            </div>
          </div>
          <div className="min-w-[40px]"> 
            <div 
              className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-50 transition-colors mt-8"
              onClick={() => document.getElementById('new-item-image')?.click()}
            >
              {newItem.image ? (
                <img 
                  src={URL.createObjectURL(newItem.image)} 
                  alt="New item" 
                  className="w-8 h-8 object-cover rounded"
                />
              ) : (
                <ImagePlus className="w-4 h-4 text-gray-400" />
              )}
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="new-item-image"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button 
            type="button"
            onClick={handleAddItem}
          >
            Add Now
          </Button>
        </div>
      </div>
    </div>
  );
};