import { CreditCard, Wallet, Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function PaymentAccountTab() {
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, name: "first bank", description: "first bank • first bank" }
  ]);

  const [newBankAccount, setNewBankAccount] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    swiftCode: ""
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [connectedGateways, setConnectedGateways] = useState({
    stripe: true,
    paypal: false,
    paystack: false,
    flutterwave: false
  });

  const handleConnect = (gateway: keyof typeof connectedGateways) => {
    setConnectedGateways(prev => ({
      ...prev,
      [gateway]: !prev[gateway]
    }));
    
    toast.success(!connectedGateways[gateway] 
      ? `Successfully connected to ${gateway}` 
      : `Successfully disconnected from ${gateway}`
    );
  };

  const handleAddBankAccount = () => {
    if (!newBankAccount.bankName || !newBankAccount.accountNumber || !newBankAccount.accountName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAccount = {
      id: Date.now(),
      name: newBankAccount.bankName,
      description: `${newBankAccount.accountName} • ${newBankAccount.accountNumber}`
    };

    setBankAccounts([...bankAccounts, newAccount]);
    setNewBankAccount({
      bankName: "",
      accountNumber: "",
      accountName: "",
      swiftCode: ""
    });
    setShowAddForm(false);
    toast.success("Bank account added successfully");
  };

  const handleDeleteAccount = (id: number) => {
    setBankAccounts(bankAccounts.filter(account => account.id !== id));
    toast.success("Bank account deleted successfully");
  };

  const handleEditAccount = (id: number) => {
    const account = bankAccounts.find(acc => acc.id === id);
    if (account) {
      setEditingId(id);
      setNewBankAccount({
        bankName: account.name,
        accountNumber: account.description.split(" • ")[1],
        accountName: account.description.split(" • ")[0],
        swiftCode: ""
      });
      setShowAddForm(true);
    }
  };

  const handleUpdateAccount = () => {
    if (!editingId) return;

    const updatedAccounts = bankAccounts.map(account => {
      if (account.id === editingId) {
        return {
          ...account,
          name: newBankAccount.bankName,
          description: `${newBankAccount.accountName} • ${newBankAccount.accountNumber}`
        };
      }
      return account;
    });

    setBankAccounts(updatedAccounts);
    setEditingId(null);
    setNewBankAccount({
      bankName: "",
      accountNumber: "",
      accountName: "",
      swiftCode: ""
    });
    setShowAddForm(false);
    toast.success("Bank account updated successfully");
  };

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
                <p className="text-sm text-muted-foreground">
                  {connectedGateways.stripe ? "Last used: 2024-03-15" : "Not connected"}
                </p>
              </div>
            </div>
            <Button 
              variant={connectedGateways.stripe ? "outline" : "default"}
              onClick={() => handleConnect('stripe')}
            >
              {connectedGateways.stripe ? "Disconnect" : "Connect"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5" />
              <div>
                <h3 className="font-medium">PayPal</h3>
                <p className="text-sm text-muted-foreground">Coming Soon</p>
              </div>
            </div>
            <Button disabled>Connect</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Paystack</h3>
                <p className="text-sm text-muted-foreground">
                  {connectedGateways.paystack ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => handleConnect('paystack')}
              variant={connectedGateways.paystack ? "outline" : "default"}
            >
              {connectedGateways.paystack ? "Disconnect" : "Connect"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Flutterwave</h3>
                <p className="text-sm text-muted-foreground">
                  {connectedGateways.flutterwave ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => handleConnect('flutterwave')}
              variant={connectedGateways.flutterwave ? "outline" : "default"}
            >
              {connectedGateways.flutterwave ? "Disconnect" : "Connect"}
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Bank Accounts</h2>
        <div className="space-y-6">
          {bankAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-sm text-muted-foreground">{account.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleEditAccount(account.id)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeleteAccount(account.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {!showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              Add Bank Account
            </Button>
          )}

          {showAddForm && (
            <div className="space-y-6">
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
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    setNewBankAccount({
                      bankName: "",
                      accountNumber: "",
                      accountName: "",
                      swiftCode: ""
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingId ? handleUpdateAccount : handleAddBankAccount}>
                  {editingId ? "Update" : "Save"} Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}