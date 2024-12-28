import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, CreditCard, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentDetailsProps {
  selectedBankAccounts: string[];
  selectedGateway: string | null;
  onBankAccountAdd: (accountId: string) => void;
  onBankAccountRemove: (accountId: string) => void;
  onPaymentGatewayChange: (gatewayId: string) => void;
}

export const PaymentDetails = ({ 
  selectedBankAccounts,
  selectedGateway,
  onBankAccountAdd,
  onBankAccountRemove,
  onPaymentGatewayChange 
}: PaymentDetailsProps) => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [paymentGateways, setPaymentGateways] = useState([]);

  useEffect(() => {
    // In a real app, this would fetch from your API
    const mockBankAccounts = [
      { id: '1', name: "First Bank Account", advantage: "No transaction fees" },
      { id: '2', name: "Second Bank Account", advantage: "Fast processing" }
    ];
    const mockGateways = [
      { id: 'stripe', name: "Stripe", advantage: "International payments" },
      { id: 'paypal', name: "PayPal", advantage: "Buyer protection" }
    ];
    
    setBankAccounts(mockBankAccounts);
    setPaymentGateways(mockGateways);
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Bank Accounts</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedBankAccounts.map((accountId) => {
            const account = bankAccounts.find((acc: any) => acc.id === accountId);
            return account ? (
              <Badge key={accountId} variant="secondary" className="flex items-center gap-1">
                <Wallet className="w-3 h-3" />
                {account.name}
                <button
                  type="button"
                  onClick={() => onBankAccountRemove(accountId)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ) : null;
          })}
        </div>
        <Select onValueChange={onBankAccountAdd}>
          <SelectTrigger>
            <SelectValue placeholder="Add bank account" />
          </SelectTrigger>
          <SelectContent>
            {bankAccounts.map((account: any) => (
              <SelectItem 
                key={account.id} 
                value={account.id}
                disabled={selectedBankAccounts.includes(account.id)}
              >
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankAccounts.map((account: any) => (
            <Card key={account.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  <h4 className="font-medium">{account.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{account.advantage}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Payment Gateway</Label>
        {selectedGateway && (
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <CreditCard className="w-3 h-3" />
              {paymentGateways.find((g: any) => g.id === selectedGateway)?.name}
              <button
                type="button"
                onClick={() => onPaymentGatewayChange('')}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          </div>
        )}
        <Select onValueChange={onPaymentGatewayChange} value={selectedGateway || undefined}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentGateways.map((gateway: any) => (
            <Card key={gateway.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <h4 className="font-medium">{gateway.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{gateway.advantage}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};