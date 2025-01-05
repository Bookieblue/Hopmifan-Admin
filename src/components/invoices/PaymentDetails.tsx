import { useState } from "react";
import { CurrencySelect } from "./payment/CurrencySelect";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        <div className="space-y-2">
          <Label>Payment Type</Label>
          <Select defaultValue="one-time">
            <SelectTrigger>
              <SelectValue placeholder="Select payment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time Payment</SelectItem>
              <SelectItem value="recurring">Recurring Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CurrencySelect 
          selectedCurrency={selectedCurrency} 
          onCurrencyChange={onCurrencyChange} 
        />
      </div>
    </div>
  );
};