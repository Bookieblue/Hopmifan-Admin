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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <InvoiceItemCard
            key={item.id}
            item={item}
            onUpdate={updateItem}
            onImageUpload={handleImageUpload}
          />
        ))}
      </div>

      <Button 
        type="button"
        variant="outline" 
        className="w-full gap-2 border-dashed" 
        onClick={addItem}
      >
        <Plus className="w-4 h-4" />
        Add New Item
      </Button>

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