import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentDetailsProps {
  onBankAccountChange: (accountId: string) => void;
  onPaymentGatewayChange: (gatewayId: string) => void;
}

export const PaymentDetails = ({ onBankAccountChange, onPaymentGatewayChange }: PaymentDetailsProps) => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [paymentGateways, setPaymentGateways] = useState([]);

  useEffect(() => {
    // In a real app, this would fetch from your API
    const mockBankAccounts = [
      { id: '1', name: "First Bank Account" },
      { id: '2', name: "Second Bank Account" }
    ];
    const mockGateways = [
      { id: 'stripe', name: "Stripe" },
      { id: 'paypal', name: "PayPal" }
    ];
    
    setBankAccounts(mockBankAccounts);
    setPaymentGateways(mockGateways);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label>Bank Account</Label>
        <Select onValueChange={onBankAccountChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select bank account" />
          </SelectTrigger>
          <SelectContent>
            {bankAccounts.map((account: any) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Payment Gateway</Label>
        <Select onValueChange={onPaymentGatewayChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment gateway" />
          </SelectTrigger>
          <SelectContent>
            {paymentGateways.map((gateway: any) => (
              <SelectItem key={gateway.id} value={gateway.id}>
                {gateway.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};