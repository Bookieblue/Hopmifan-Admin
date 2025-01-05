import { ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { InvoiceItem } from "@/types/invoice";

interface InvoiceItemCardProps {
  item: InvoiceItem;
  onUpdate: (id: string, field: keyof InvoiceItem, value: any) => void;
  onImageUpload: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InvoiceItemCard = ({ item, onUpdate, onImageUpload }: InvoiceItemCardProps) => {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div 
              className="relative w-16 h-16 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById(`image-${item.id}`)?.click()}
            >
              {item.image ? (
                <img 
                  src={URL.createObjectURL(item.image)} 
                  alt="Item" 
                  className="w-14 h-14 object-cover rounded"
                />
              ) : (
                <ImagePlus className="w-6 h-6 text-gray-400" />
              )}
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id={`image-${item.id}`}
                onChange={(e) => onImageUpload(item.id, e)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor={`description-${item.id}`} className="mb-2 block">
                Item Description
              </Label>
              <Input
                id={`description-${item.id}`}
                value={item.description}
                onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                placeholder="Enter item description"
                className="flex-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
              <Input
                id={`quantity-${item.id}`}
                type="number"
                value={item.quantity}
                onChange={(e) => onUpdate(item.id, 'quantity', Number(e.target.value))}
                min={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor={`price-${item.id}`}>Price</Label>
              <Input
                id={`price-${item.id}`}
                type="number"
                value={item.price}
                onChange={(e) => onUpdate(item.id, 'price', Number(e.target.value))}
                min={0}
                step="0.01"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor={`amount-${item.id}`}>Amount</Label>
              <Input
                id={`amount-${item.id}`}
                type="number"
                value={item.amount}
                disabled
                className="mt-2 bg-muted"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};