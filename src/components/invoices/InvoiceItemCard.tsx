import { ImagePlus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { InvoiceItem } from "@/types/invoice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceItemCardProps {
  item: InvoiceItem;
  onUpdate: (id: string, field: keyof InvoiceItem, value: any) => void;
  onImageUpload: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InvoiceItemCard = ({ item, onUpdate, onImageUpload }: InvoiceItemCardProps) => {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
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
            <Input
              value={item.description}
              onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
              placeholder="Enter item description"
              className="border-0 p-0 h-auto text-base font-medium focus-visible:ring-0"
            />
            <div className="text-sm text-muted-foreground">
              {item.price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => onUpdate(item.id, 'quantity', Number(e.target.value))}
              min={1}
              className="w-20 text-center"
            />

            <Select 
              value={(item.tax || "0").toString()} 
              onValueChange={(value) => onUpdate(item.id, 'tax', Number(value))}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Tax" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No Tax</SelectItem>
                <SelectItem value="10">10%</SelectItem>
                <SelectItem value="15">15%</SelectItem>
                <SelectItem value="20">20%</SelectItem>
              </SelectContent>
            </Select>

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