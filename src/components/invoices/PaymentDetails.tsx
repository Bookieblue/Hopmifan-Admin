import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, CreditCard, Wallet, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface PaymentDetailsProps {
  selectedBankAccounts: string[];
  selectedGateway: string | null;
  onBankAccountAdd: (accountId: string) => void;
  onBankAccountRemove: (accountId: string) => void;
  onPaymentGatewayChange: (gatewayId: string) => void;
  onCustomerSelect: (customer: any) => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  invoice: {
    number: string;
    date: string;
    currency: string;
    customer: any;
    items: Array<{
      description: string;
      quantity: number;
      price: number;
      amount: number;
    }>;
    notes: string;
    terms: string;
  };
  onInvoiceChange: (invoice: any) => void;
}

export const PaymentDetails = ({ 
  selectedBankAccounts,
  selectedGateway,
  onBankAccountAdd,
  onBankAccountRemove,
  onPaymentGatewayChange,
  onCustomerSelect,
  selectedCurrency,
  onCurrencyChange,
  invoice,
  onInvoiceChange
}: PaymentDetailsProps) => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [paymentGateways, setPaymentGateways] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [includeBillingAddress, setIncludeBillingAddress] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    street: "",
    country: "",
    state: "",
    postalCode: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const mockBankAccounts = [
      { id: '1', name: "First Bank Account" },
      { id: '2', name: "Second Bank Account" }
    ];
    const mockGateways = [
      { id: 'stripe', name: "Stripe" },
      { id: 'paypal', name: "PayPal" }
    ];
    const mockCustomers = [
      { id: '1', name: "Customer 1", email: "customer1@example.com" },
      { id: '2', name: "Customer 2", email: "customer2@example.com" }
    ];
    
    setBankAccounts(mockBankAccounts);
    setPaymentGateways(mockGateways);
    setCustomers(mockCustomers);
  }, []);

  const filteredCustomers = customers.filter((customer: any) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomerSelect = (customer: any) => {
    onCustomerSelect(customer);
    setSearchTerm("");
  };

  const handleAddNewCustomer = () => {
    const customer = {
      id: Date.now().toString(),
      ...newCustomer,
    };
    setCustomers(prev => [...prev, customer]);
    onCustomerSelect(customer);
    setNewCustomer({
      name: "",
      email: "",
      street: "",
      country: "",
      state: "",
      postalCode: "",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Currency</Label>
          <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NGN">NGN (₦)</SelectItem>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Customer</Label>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  New Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      placeholder="Enter customer name"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email" 
                      placeholder="Enter customer email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="billing-address"
                      checked={includeBillingAddress}
                      onCheckedChange={setIncludeBillingAddress}
                    />
                    <Label htmlFor="billing-address">Include Billing Address</Label>
                  </div>
                  {includeBillingAddress && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Street Address</Label>
                        <Input 
                          placeholder="Enter street address"
                          value={newCustomer.street}
                          onChange={(e) => setNewCustomer(prev => ({ ...prev, street: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Input 
                          placeholder="Enter country"
                          value={newCustomer.country}
                          onChange={(e) => setNewCustomer(prev => ({ ...prev, country: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>State</Label>
                        <Input 
                          placeholder="Enter state"
                          value={newCustomer.state}
                          onChange={(e) => setNewCustomer(prev => ({ ...prev, state: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Postal Code</Label>
                        <Input 
                          placeholder="Enter postal code"
                          value={newCustomer.postalCode}
                          onChange={(e) => setNewCustomer(prev => ({ ...prev, postalCode: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                  <Button className="w-full" onClick={handleAddNewCustomer}>Add Customer</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {searchTerm && filteredCustomers.length > 0 && (
            <div className="mt-2 border rounded-md divide-y">
              {filteredCustomers.map((customer: any) => (
                <div 
                  key={customer.id} 
                  className="p-2 hover:bg-accent cursor-pointer"
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Bank Accounts</Label>
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
          <div className="flex flex-wrap gap-2 mt-2">
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
        </div>

        <div className="space-y-2">
          <Label>Payment Gateway</Label>
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
          {selectedGateway && (
            <div className="flex flex-wrap gap-2 mt-2">
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
        </div>
      </div>
    </div>
  );
};
