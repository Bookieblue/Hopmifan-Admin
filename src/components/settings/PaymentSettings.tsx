import { CreditCard, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PaymentSettings() {
  const [bankAccounts, setBankAccounts] = useState([
    { name: "first bank", description: "first bank • first bank" }
  ]);

  const [newBankAccount, setNewBankAccount] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    swiftCode: ""
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Payment Gateways</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Stripe</h3>
                <p className="text-sm text-muted-foreground">Last used: 2024-03-15</p>
              </div>
            </div>
            <Button variant="outline">Manage</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5" />
              <div>
                <h3 className="font-medium">PayPal</h3>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button>Connect</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Paystack</h3>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button>Connect</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Flutterwave</h3>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button>Connect</Button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Bank Accounts</h2>
        <div className="space-y-6">
          {bankAccounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-sm text-muted-foreground">{account.description}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bank Name</label>
              <Input
                value={newBankAccount.bankName}
                onChange={(e) => setNewBankAccount({ ...newBankAccount, bankName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Number</label>
              <Input
                value={newBankAccount.accountNumber}
                onChange={(e) => setNewBankAccount({ ...newBankAccount, accountNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Name</label>
              <Input
                value={newBankAccount.accountName}
                onChange={(e) => setNewBankAccount({ ...newBankAccount, accountName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">SWIFT/BIC Code (Optional)</label>
              <Input
                value={newBankAccount.swiftCode}
                onChange={(e) => setNewBankAccount({ ...newBankAccount, swiftCode: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}