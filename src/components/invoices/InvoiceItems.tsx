import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ImagePlus } from "lucide-react";
import type { InvoiceItem } from "@/types/invoice";

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
}

export const InvoiceItems = ({ items, onItemsChange }: InvoiceItemsProps) => {
  useEffect(() => {
    if (items.length === 0) {
      addItem();
    }
  }, []);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "",
      quantity: 1,
      price: 0,
      amount: 0,
      tax: 0,
      discount: 0,
      image: null
    };
    onItemsChange([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Auto-calculate amount when quantity, price, tax, or discount changes
        if (['quantity', 'price', 'tax', 'discount'].includes(field)) {
          const subtotal = Number(updatedItem.quantity) * Number(updatedItem.price);
          const taxAmount = subtotal * (Number(updatedItem.tax) / 100);
          const discountAmount = subtotal * (Number(updatedItem.discount) / 100);
          updatedItem.amount = subtotal + taxAmount - discountAmount;
        }
        return updatedItem;
      }
      return item;
    });
    onItemsChange(updatedItems);
  };

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateItem(id, 'image', file);
    }
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      onItemsChange(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <Label>Description</Label>
        </div>
        <div className="col-span-1">
          <Label>Qty</Label>
        </div>
        <div className="col-span-2">
          <Label>Price</Label>
        </div>
        <div className="col-span-1">
          <Label>Tax %</Label>
        </div>
        <div className="col-span-1">
          <Label>Disc %</Label>
        </div>
        <div className="col-span-2">
          <Label>Amount</Label>
        </div>
      </div>

      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4 space-y-2">
            <Input
              value={item.description}
              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              placeholder="Item description"
            />
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id={`image-${item.id}`}
                onChange={(e) => handleImageUpload(item.id, e)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => document.getElementById(`image-${item.id}`)?.click()}
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                {item.image ? 'Change Image' : 'Add Image'}
              </Button>
              {item.image && <span className="text-sm text-muted-foreground">{item.image.name}</span>}
            </div>
          </div>
          <div className="col-span-1">
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              value={item.price}
              onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
              min={0}
              step="0.01"
            />
          </div>
          <div className="col-span-1">
            <Input
              type="number"
              value={item.tax}
              onChange={(e) => updateItem(item.id, 'tax', Number(e.target.value))}
              min={0}
              max={100}
            />
          </div>
          <div className="col-span-1">
            <Input
              type="number"
              value={item.discount}
              onChange={(e) => updateItem(item.id, 'discount', Number(e.target.value))}
              min={0}
              max={100}
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              value={item.amount}
              disabled
            />
          </div>
          <div className="col-span-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => removeItem(item.id)}
              disabled={items.length === 1}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button 
        type="button"
        variant="outline" 
        className="mt-4 gap-2" 
        onClick={addItem}
      >
        <Plus className="w-4 h-4" />
        Add Item
      </Button>
    </div>
  );
};