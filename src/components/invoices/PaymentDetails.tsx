import { useState } from "react";
import { CurrencySelect } from "./payment/CurrencySelect";
import { PaymentMethodSelect } from "./payment/PaymentMethodSelect";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentDetailsProps {
  selectedBankAccounts: string[];
  selectedGateway: string | null;
  onBankAccountAdd: (accountId: string) => void;
  onBankAccountRemove: (accountId: string) => void;
  onPaymentGatewayChange: (gatewayId: string) => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export const PaymentDetails = ({ 
  selectedBankAccounts = [],
  selectedGateway,
  onBankAccountAdd,
  onBankAccountRemove,
  onPaymentGatewayChange,
  selectedCurrency,
  onCurrencyChange,
}: PaymentDetailsProps) => {
  const [bankAccounts] = useState([
    { id: '1', name: "First Bank Account" },
    { id: '2', name: "Second Bank Account" }
  ]);
  
  const [paymentGateways] = useState([
    { id: 'stripe', name: "Stripe" },
    { id: 'paypal', name: "PayPal" }
  ]);

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

      <PaymentMethodSelect 
        selectedBankAccounts={selectedBankAccounts}
        selectedGateway={selectedGateway}
        onBankAccountAdd={onBankAccountAdd}
        onBankAccountRemove={onBankAccountRemove}
        onPaymentGatewayChange={onPaymentGatewayChange}
        bankAccounts={bankAccounts}
        paymentGateways={paymentGateways}
      />
    </div>
  );
};