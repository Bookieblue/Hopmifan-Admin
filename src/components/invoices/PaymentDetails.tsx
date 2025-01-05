import { Label } from "@/components/ui/label";
import { CurrencySelect } from "./payment/CurrencySelect";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface PaymentDetailsProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  paymentType: "one-time" | "recurring";
  onPaymentTypeChange: (type: "one-time" | "recurring") => void;
}

export const PaymentDetails = ({
  selectedCurrency,
  onCurrencyChange,
  paymentType,
  onPaymentTypeChange,
}: PaymentDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Payment Type</Label>
          <Select value={paymentType} onValueChange={(value: "one-time" | "recurring") => onPaymentTypeChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time Payment</SelectItem>
              <SelectItem value="recurring">Recurring Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Currency</Label>
          <CurrencySelect
            value={selectedCurrency}
            onValueChange={onCurrencyChange}
          />
        </div>
      </div>
    </div>
  );
};