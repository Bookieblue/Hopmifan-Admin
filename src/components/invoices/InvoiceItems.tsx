import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { InvoiceItem } from "@/types/invoice";
import { InvoiceItemCard } from "./InvoiceItemCard";

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
}

export const InvoiceItems = ({ items, onItemsChange }: InvoiceItemsProps) => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [newItem, setNewItem] = useState<Partial<InvoiceItem>>({
    description: "",
    quantity: 1,
    price: 0,
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
      description: "",
      quantity: 1,
      price: 0,
      image: null
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
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
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <InvoiceItemCard
            key={item.id}
            item={item}
            onUpdate={updateItem}
            onImageUpload={(id, event) => updateItem(id, 'image', event.target.files?.[0])}
          />
        ))}
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-medium mb-4">Add New Item</h3>
        <div className="flex gap-4 items-start">
          <div 
            className="relative w-16 h-16 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => document.getElementById('new-item-image')?.click()}
          >
            {newItem.image ? (
              <img 
                src={URL.createObjectURL(newItem.image)} 
                alt="New item" 
                className="w-14 h-14 object-cover rounded"
              />
            ) : (
              <Plus className="w-6 h-6 text-gray-400" />
            )}
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="new-item-image"
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex-1">
            <Input
              value={newItem.description}
              onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter item description"
              className="mb-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                min={1}
                placeholder="Quantity"
              />
              <Input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem(prev => ({ ...prev, price: Number(e.target.value) }))}
                min={0}
                step="0.01"
                placeholder="Price"
              />
            </div>
          </div>
        </div>
        <Button 
          type="button"
          className="w-full mt-4" 
          onClick={handleAddItem}
        >
          Add Now
        </Button>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="coupon" 
            checked={showCoupon}
            onCheckedChange={(checked) => setShowCoupon(checked as boolean)}
          />
          <label
            htmlFor="coupon"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Add Coupon
          </label>
        </div>

        {showCoupon && (
          <Input
            placeholder="Enter coupon code"
            className="max-w-md"
          />
        )}

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="discount" 
            checked={showDiscount}
            onCheckedChange={(checked) => setShowDiscount(checked as boolean)}
          />
          <label
            htmlFor="discount"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Add Discount
          </label>
        </div>

        {showDiscount && (
          <select 
            value={selectedDiscount}
            onChange={(e) => setSelectedDiscount(e.target.value)}
            className="w-full max-w-md border rounded-md p-2"
          >
            <option value="">Select a discount</option>
            <option value="summer">Summer Sale 10%</option>
            <option value="winter">Winter Special 15%</option>
          </select>
        )}
      </div>
    </div>
  );
};