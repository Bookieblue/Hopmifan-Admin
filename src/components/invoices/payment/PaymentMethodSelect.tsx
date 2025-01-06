import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { CreditCard, Wallet, X } from "lucide-react";

interface PaymentMethodSelectProps {
  selectedBankAccounts: string[];
  selectedGateway: string | null;
  onBankAccountAdd: (accountId: string) => void;
  onBankAccountRemove: (accountId: string) => void;
  onPaymentGatewayChange: (gatewayId: string) => void;
  bankAccounts: Array<{ id: string; name: string; }>;
  paymentGateways: Array<{ id: string; name: string; }>;
}

export const PaymentMethodSelect = ({
  selectedBankAccounts,
  selectedGateway,
  onBankAccountAdd,
  onBankAccountRemove,
  onPaymentGatewayChange,
  bankAccounts,
  paymentGateways
}: PaymentMethodSelectProps) => {
  const handleValueChange = (value: string) => {
    if (value.startsWith('bank_')) {
      const accountId = value.replace('bank_', '');
      onBankAccountAdd(accountId);
      if (selectedGateway) {
        onPaymentGatewayChange('');
      }
    } else {
      if (selectedBankAccounts.length > 0) {
        onBankAccountRemove(selectedBankAccounts[0]);
      }
      onPaymentGatewayChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Payment Methods</Label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Add payment method" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Bank Accounts</SelectLabel>
            {bankAccounts?.map((account) => (
              <SelectItem
                key={`bank_${account.id}`}
                value={`bank_${account.id}`}
                disabled={selectedBankAccounts.includes(account.id)}
              >
                {account.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Payment Gateways</SelectLabel>
            {paymentGateways?.map((gateway) => (
              <SelectItem
                key={gateway.id}
                value={gateway.id}
                disabled={selectedGateway === gateway.id}
              >
                {gateway.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedBankAccounts.map((accountId) => {
          const account = bankAccounts?.find((acc) => acc.id === accountId);
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
        {selectedGateway && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CreditCard className="w-3 h-3" />
            {paymentGateways?.find((g) => g.id === selectedGateway)?.name}
            <button
              type="button"
              onClick={() => onPaymentGatewayChange('')}
              className="ml-1 hover:text-destructive"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        )}
      </div>
    </div>
  );
};