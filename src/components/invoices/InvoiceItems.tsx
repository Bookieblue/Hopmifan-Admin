import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { InvoiceItem } from "@/types/invoice";
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
  
  const [enableTax, setEnableTax] = useState(false);
  const [enableDiscount, setEnableDiscount] = useState(false);
  const [taxRate, setTaxRate] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  
  const defaultDescription = businessType === "freelancing" ? "Service 1" : "Product 1";

  const [newItem, setNewItem] = useState<Partial<InvoiceItem>>({
    description: "",
    quantity: 1,
    price: 0,
    tax: 0,
    image: null
  });

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = (subtotal: number) => {
    if (!enableTax) return 0;
    return (subtotal * taxRate) / 100;
  };

  const calculateDiscount = (subtotal: number) => {
    if (!enableDiscount) return 0;
    if (discountType === 'percentage') {
      return (subtotal * discountRate) / 100;
    }
    return discountRate;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const discount = calculateDiscount(subtotal);
    return subtotal + tax - discount;
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

  const handleDeleteItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 bg-gray-50 rounded-lg p-6">
      <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 mb-2 px-4">
        <div className="col-span-4">Item</div>
        <div className="col-span-2">Rate</div>
        <div className="col-span-2">Qty</div>
        <div className="col-span-3">Amount</div>
        <div className="col-span-1"></div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-4 items-center bg-white p-4 rounded-lg">
            <div className="col-span-4">
              <Input
                value={item.description}
                onChange={(e) => {
                  const updatedItems = items.map(i =>
                    i.id === item.id ? { ...i, description: e.target.value } : i
                  );
                  onItemsChange(updatedItems);
                }}
                className="border-none shadow-none focus-visible:ring-0 px-0"
                placeholder="Enter item name"
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                value={item.price}
                onChange={(e) => {
                  const updatedItems = items.map(i => {
                    if (i.id === item.id) {
                      const price = Number(e.target.value);
                      return {
                        ...i,
                        price,
                        amount: price * i.quantity
                      };
                    }
                    return i;
                  });
                  onItemsChange(updatedItems);
                }}
                className="border-none shadow-none focus-visible:ring-0 px-0"
                placeholder="0.00"
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const updatedItems = items.map(i => {
                    if (i.id === item.id) {
                      const quantity = Number(e.target.value);
                      return {
                        ...i,
                        quantity,
                        amount: i.price * quantity
                      };
                    }
                    return i;
                  });
                  onItemsChange(updatedItems);
                }}
                className="border-none shadow-none focus-visible:ring-0 px-0"
                min={1}
              />
            </div>
            <div className="col-span-3">
              <Input
                type="number"
                value={item.amount}
                readOnly
                className="border-none shadow-none focus-visible:ring-0 px-0 bg-transparent"
              />
            </div>
            <div className="col-span-1 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteItem(item.id)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {/* New Item Form */}
        <div className="grid grid-cols-12 gap-4 items-center bg-white p-4 rounded-lg">
          <div className="col-span-4">
            <Input
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="border-none shadow-none focus-visible:ring-0 px-0"
              placeholder="Enter item name"
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
              className="border-none shadow-none focus-visible:ring-0 px-0"
              placeholder="0.00"
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
              className="border-none shadow-none focus-visible:ring-0 px-0"
              min={1}
              placeholder="1"
            />
          </div>
          <div className="col-span-3">
            <Input
              type="number"
              value={(newItem.price || 0) * (newItem.quantity || 1)}
              readOnly
              className="border-none shadow-none focus-visible:ring-0 px-0 bg-transparent"
            />
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="tax"
            checked={enableTax}
            onCheckedChange={(checked) => setEnableTax(checked as boolean)}
          />
          <Label htmlFor="tax">Add Tax</Label>
          {enableTax && (
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-20"
                min="0"
                max="100"
              />
              <span>%</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="discount"
            checked={enableDiscount}
            onCheckedChange={(checked) => setEnableDiscount(checked as boolean)}
          />
          <Label htmlFor="discount">Add Discount</Label>
          {enableDiscount && (
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                className="w-20"
                min="0"
              />
              <Select value={discountType} onValueChange={(value: 'percentage' | 'fixed') => setDiscountType(value)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">%</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-2 text-right">
          <div>Subtotal: {calculateSubtotal().toFixed(2)}</div>
          {enableTax && <div>Tax: {calculateTax(calculateSubtotal()).toFixed(2)}</div>}
          {enableDiscount && <div>Discount: {calculateDiscount(calculateSubtotal()).toFixed(2)}</div>}
          <div className="font-bold">Total: {calculateTotal().toFixed(2)}</div>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full mt-4"
        onClick={handleAddItem}
      >
        Add Item
      </Button>
    </div>
  );
};
