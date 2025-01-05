import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurrencySelectProps {
  value: string;
  onValueChange: (currency: string) => void;
}

export const CurrencySelect = ({ value, onValueChange }: CurrencySelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Currency</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="NGN">NGN (₦)</SelectItem>
          <SelectItem value="USD">USD ($)</SelectItem>
          <SelectItem value="EUR">EUR (€)</SelectItem>
          <SelectItem value="GBP">GBP (£)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};