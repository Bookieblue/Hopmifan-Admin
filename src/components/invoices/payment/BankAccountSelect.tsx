import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, X } from "lucide-react";

interface BankAccountSelectProps {
  selectedBankAccounts: string[];
  onBankAccountAdd: (accountId: string) => void;
  onBankAccountRemove: (accountId: string) => void;
  bankAccounts: Array<{ id: string; name: string; }>;
}

export const BankAccountSelect = ({ 
  selectedBankAccounts, 
  onBankAccountAdd, 
  onBankAccountRemove,
  bankAccounts 
}: BankAccountSelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Bank Accounts</Label>
      <Select onValueChange={onBankAccountAdd}>
        <SelectTrigger>
          <SelectValue placeholder="Add bank account" />
        </SelectTrigger>
        <SelectContent>
          {bankAccounts?.map((account) => (
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
      </div>
    </div>
  );
};