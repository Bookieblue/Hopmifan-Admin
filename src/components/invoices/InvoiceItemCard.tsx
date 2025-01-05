import { ImagePlus, Trash2, Edit, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { InvoiceItem } from "@/types/invoice";
import { useState } from "react";

interface InvoiceItemCardProps {
  item: InvoiceItem;
  onUpdate: (id: string, field: keyof InvoiceItem, value: any) => void;
  onImageUpload: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCurrency: string;
}

export const InvoiceItemCard = ({ item, onUpdate, onImageUpload, selectedCurrency }: InvoiceItemCardProps) => {
  const currencySymbol = selectedCurrency === 'NGN' ? '₦' : selectedCurrency;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div 
            className="relative w-12 h-12 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => document.getElementById(`image-${item.id}`)?.click()}
          >
            {item.image ? (
              <img 
                src={URL.createObjectURL(item.image)} 
                alt="Item" 
                className="w-10 h-10 object-cover rounded"
              />
            ) : (
              <ImagePlus className="w-5 h-5 text-gray-400" />
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
            <div className="flex items-center gap-2">
              <Input
                value={item.description}
                onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                placeholder="Enter item description"
                className="border-0 p-0 h-auto text-base font-medium focus-visible:ring-0"
              />
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {isExpanded && (
              <div className="space-y-1 mt-2 text-sm text-muted-foreground">
                <p>Quantity: {item.quantity}</p>
                <p>Tax: {item.tax}%</p>
                <p>{currencySymbol}{item.price?.toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-base font-medium">
              {currencySymbol}{(item.quantity * item.price).toLocaleString()}
            </div>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {/* Add edit functionality */}}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="text-red-500 hover:text-red-600"
              onClick={() => onUpdate(item.id, 'deleted', true)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};