import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
}

export const InvoiceItems = ({ items, onItemsChange }: InvoiceItemsProps) => {
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "",
      quantity: 1,
      price: 0,
      amount: 0
    };
    onItemsChange([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Auto-calculate amount when quantity or price changes
        if (field === 'quantity' || field === 'price') {
          updatedItem.amount = updatedItem.quantity * updatedItem.price;
        }
        return updatedItem;
      }
      return item;
    });
    onItemsChange(updatedItems);
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <Label>Description</Label>
        </div>
        <div className="col-span-2">
          <Label>Quantity</Label>
        </div>
        <div className="col-span-2">
          <Label>Price</Label>
        </div>
        <div className="col-span-2">
          <Label>Amount</Label>
        </div>
      </div>

      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-5">
            <Input
              value={item.description}
              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              placeholder="Item description"
            />
          </div>
          <div className="col-span-2">
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
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" className="mt-4 gap-2" onClick={addItem}>
        <Plus className="w-4 h-4" />
        Add Item
      </Button>
    </div>
  );
};