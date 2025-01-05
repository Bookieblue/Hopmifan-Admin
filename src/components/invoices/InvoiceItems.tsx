import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ImagePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
      image: null
    };
    onItemsChange([...items, newItem]);
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
    <div className="space-y-6">
      <div className="grid grid-cols-8 gap-6 px-6 py-4 bg-muted/50 rounded-lg">
        <div className="col-span-3">
          <Label className="text-sm font-medium">Description</Label>
        </div>
        <div className="col-span-1">
          <Label className="text-sm font-medium">Qty</Label>
        </div>
        <div className="col-span-2">
          <Label className="text-sm font-medium">Price</Label>
        </div>
        <div className="col-span-2">
          <Label className="text-sm font-medium">Amount</Label>
        </div>
      </div>

      {items.map((item) => (
        <Card key={item.id} className="border shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-8 gap-6 items-start">
              <div className="col-span-3 space-y-4">
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  placeholder="Enter item description"
                  className="w-full"
                />
                <div className="flex items-center gap-3">
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
                    className="h-9"
                    onClick={() => document.getElementById(`image-${item.id}`)?.click()}
                  >
                    <ImagePlus className="w-4 h-4 mr-2" />
                    {item.image ? 'Change Image' : 'Add Image'}
                  </Button>
                  {item.image && (
                    <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                      {item.image.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                  min={1}
                  className="w-full"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                  min={0}
                  step="0.01"
                  className="w-full"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={item.amount}
                  disabled
                  className="w-full bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button 
        type="button"
        variant="outline" 
        className="w-full mt-6 gap-2 border-dashed" 
        onClick={addItem}
      >
        <Plus className="w-4 h-4" />
        Add New Item
      </Button>
    </div>
  );
};