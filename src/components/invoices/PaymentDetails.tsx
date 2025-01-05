import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelect } from "./payment/CurrencySelect";

interface PaymentDetailsProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export const PaymentDetails = ({ 
  selectedCurrency,
  onCurrencyChange,
}: PaymentDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CurrencySelect 
          selectedCurrency={selectedCurrency} 
          onCurrencyChange={onCurrencyChange} 
        />
      </div>
    </div>
  );
};