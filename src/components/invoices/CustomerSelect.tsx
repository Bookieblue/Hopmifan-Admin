import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { UserPlus, PenSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { BillingAddressForm } from "./BillingAddressForm";

interface CustomerSelectProps {
  onCustomerSelect: (customer: any) => void;
  initialCustomer?: any;
}

export const CustomerSelect = ({ onCustomerSelect, initialCustomer }: CustomerSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(!initialCustomer);
  const [includeBillingAddress, setIncludeBillingAddress] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(initialCustomer);
  const { toast } = useToast();
  
  // Initialize with some example customers
  const [customers, setCustomers] = useState([
    { 
      id: '1', 
      name: "Acme Corp", 
      email: "billing@acme.com",
      street: "123 Business Ave",
      country: "Nigeria",
      state: "Lagos",
      postalCode: "100001"
    },
    { 
      id: '2', 
      name: "TechStart Solutions", 
      email: "finance@techstart.com",
      street: "456 Innovation Way",
      country: "Nigeria",
      state: "Abuja",
      postalCode: "900001"
    }
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    street: "",
    country: "",
    state: "",
    postalCode: "",
  });

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    onCustomerSelect(customer);
    setSearchTerm("");
    setIsSearchMode(false);
  };

  const handleAddNewCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    const customer = {
      id: Date.now().toString(),
      ...newCustomer,
    };

    setCustomers(prev => [...prev, customer]);
    handleCustomerSelect(customer);
    
    setNewCustomer({
      name: "",
      email: "",
      street: "",
      country: "",
      state: "",
      postalCode: "",
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "New customer added successfully",
    });
  };

  const handleNewCustomerFieldChange = (field: string, value: string) => {
    setNewCustomer(prev => ({ ...prev, [field]: value }));
  };

  // Show selected customer card if a customer is selected and not in search mode
  if (!isSearchMode && (initialCustomer || selectedCustomer)) {
    const displayCustomer = initialCustomer || selectedCustomer;
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Customer</Label>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchMode(true)}
            className="h-8 w-8 p-0"
          >
            <PenSquare className="h-4 w-4" />
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <div className="font-medium">{displayCustomer.name}</div>
              <div className="text-sm text-muted-foreground">{displayCustomer.email}</div>
              {displayCustomer.street && (
                <div className="text-sm text-muted-foreground">
                  {displayCustomer.street}, {displayCustomer.state} {displayCustomer.postalCode}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
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
            <Button variant="outline" size="icon" className="h-10 w-10">
              <UserPlus className="h-4 w-4" />
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
                  onChange={(e) => handleNewCustomerFieldChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  type="email" 
                  placeholder="Enter customer email"
                  value={newCustomer.email}
                  onChange={(e) => handleNewCustomerFieldChange('email', e.target.value)}
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
                <BillingAddressForm 
                  newCustomer={newCustomer}
                  onChange={handleNewCustomerFieldChange}
                />
              )}
              <Button className="w-full" onClick={handleAddNewCustomer}>Add Customer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {searchTerm && filteredCustomers.length > 0 && (
        <div className="mt-2 border rounded-md divide-y">
          {filteredCustomers.map((customer) => (
            <div 
              key={customer.id} 
              className="p-2 hover:bg-accent cursor-pointer"
              onClick={() => handleCustomerSelect(customer)}
            >
              <div className="font-medium">{customer.name}</div>
              <div className="text-sm text-muted-foreground">{customer.email}</div>
              {customer.street && (
                <div className="text-sm text-muted-foreground">
                  {customer.street}, {customer.state} {customer.postalCode}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
