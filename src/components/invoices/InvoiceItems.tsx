import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ImagePlus } from "lucide-react";
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
      {items.map((item) => (
        <Card key={item.id} className="border shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div 
                  className="relative w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => document.getElementById(`image-${item.id}`)?.click()}
                >
                  <ImagePlus className="w-5 h-5 text-gray-500" />
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id={`image-${item.id}`}
                    onChange={(e) => handleImageUpload(item.id, e)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`description-${item.id}`} className="mb-2 block">
                    Item Description
                  </Label>
                  <Input
                    id={`description-${item.id}`}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Enter item description"
                    className="w-full"
                  />
                  {item.image && (
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {item.image.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor={`quantity-${item.id}`} className="mb-2 block">
                    Quantity
                  </Label>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    min={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor={`price-${item.id}`} className="mb-2 block">
                    Price
                  </Label>
                  <Input
                    id={`price-${item.id}`}
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                    min={0}
                    step="0.01"
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor={`amount-${item.id}`} className="mb-2 block">
                    Amount
                  </Label>
                  <Input
                    id={`amount-${item.id}`}
                    type="number"
                    value={item.amount}
                    disabled
                    className="w-full bg-muted"
                  />
                </div>
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