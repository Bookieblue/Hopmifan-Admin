import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CurrencySelect } from "./payment/CurrencySelect";

export interface PaymentDetailsProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export const PaymentDetails = ({
  selectedCurrency,
  onCurrencyChange,
}: PaymentDetailsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Currency</Label>
        <CurrencySelect
          value={selectedCurrency}
          onValueChange={onCurrencyChange}
        />
      </div>
    </div>
  );
};