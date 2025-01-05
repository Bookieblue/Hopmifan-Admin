import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { UserPlus, PenSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
  
  const [customers, setCustomers] = useState([
    { id: '1', name: "Customer 1", email: "customer1@example.com" },
    { id: '2', name: "Customer 2", email: "customer2@example.com" }
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

    // Add the new customer to the customers list
    setCustomers(prev => [...prev, customer]);
    
    // Select the newly added customer
    onCustomerSelect(customer);
    
    // Reset form and close dialog
    setNewCustomer({
      name: "",
      email: "",
      street: "",
      country: "",
      state: "",
      postalCode: "",
    });
    setIsDialogOpen(false);
    setIsSearchMode(false);
    
    toast({
      title: "Success",
      description: "New customer added successfully",
    });
  };

  const handleNewCustomerFieldChange = (field: string, value: string) => {
    setNewCustomer(prev => ({ ...prev, [field]: value }));
  };

  if (!isSearchMode && initialCustomer) {
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
              <div className="font-medium">{initialCustomer.name}</div>
              <div className="text-sm text-muted-foreground">{initialCustomer.email}</div>
              {initialCustomer.street && (
                <div className="text-sm text-muted-foreground">
                  {initialCustomer.street}, {initialCustomer.state} {initialCustomer.postalCode}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};