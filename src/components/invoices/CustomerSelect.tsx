import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { UserPlus, PenSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

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
  
  const [customers] = useState([
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
    const customer = {
      id: Date.now().toString(),
      ...newCustomer,
    };
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
    setIsSearchMode(false);
    toast({
      title: "Success",
      description: "New customer added successfully",
    });
  };

  if (!isSearchMode && (initialCustomer || customers.find(c => c.id === initialCustomer?.id))) {
    const customer = initialCustomer || customers.find(c => c.id === initialCustomer?.id);
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Customer</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchMode(true)}
            className="h-8 w-8 p-0"
          >
            <PenSquare className="h-4 w-4" />
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <div className="font-medium">{customer.name}</div>
              <div className="text-sm text-muted-foreground">{customer.email}</div>
              {customer.street && (
                <div className="text-sm text-muted-foreground">
                  {customer.street}, {customer.state} {customer.postalCode}
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