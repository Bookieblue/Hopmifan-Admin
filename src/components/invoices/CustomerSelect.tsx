import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomerCard } from "./CustomerCard";
import { SearchResults } from "@/components/customers/SearchResults";
import { NewCustomerForm } from "@/components/customers/NewCustomerForm";
import { Customer, NewCustomer } from "@/types/customer";

interface CustomerSelectProps {
  onCustomerSelect: (customer: Customer) => void;
  initialCustomer?: Customer;
}

export const CustomerSelect = ({ onCustomerSelect, initialCustomer }: CustomerSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(!initialCustomer);
  const [includeBillingAddress, setIncludeBillingAddress] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(initialCustomer);
  const { toast } = useToast();
  
  const [customers] = useState<Customer[]>([
    { 
      id: '1', 
      name: "Acme Corp", 
      email: "billing@acme.com",
      phone: "+1 234 567 890",
      address: "123 Business Ave, Lagos, Nigeria",
      billingAddress: "123 Business Ave, Lagos, Nigeria",
      totalSpent: "₦12,500.00",
      date: "15 Mar 2024",
      profilePicture: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      invoices: [],
      estimates: [],
      receipts: []
    },
    { 
      id: '2', 
      name: "TechStart Solutions", 
      email: "finance@techstart.com",
      phone: "+1 987 654 321",
      address: "456 Innovation Way, Abuja, Nigeria",
      billingAddress: "456 Innovation Way, Abuja, Nigeria",
      totalSpent: "₦8,750.00",
      date: "14 Mar 2024",
      profilePicture: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      invoices: [],
      estimates: [],
      receipts: []
    }
  ]);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    onCustomerSelect(customer);
    setSearchTerm("");
    setIsSearchMode(false);
  };

  const handleNewCustomerFieldChange = (field: string, value: string) => {
    setNewCustomer(prev => ({ ...prev, [field]: value }));
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

    const customer: Customer = {
      id: Date.now().toString(),
      ...newCustomer,
      phone: "",
      address: "",
      totalSpent: "₦0.00",
      date: new Date().toLocaleDateString('en-US', { 
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      invoices: [],
      estimates: [],
      receipts: []
    };

    handleCustomerSelect(customer);
    
    setNewCustomer({
      name: "",
      email: "",
      billingAddress: "",
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "New customer added successfully",
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Customer</Label>
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <NewCustomerForm 
              newCustomer={newCustomer}
              includeBillingAddress={includeBillingAddress}
              onFieldChange={handleNewCustomerFieldChange}
              onBillingAddressToggle={setIncludeBillingAddress}
              onSubmit={handleAddNewCustomer}
            />
          </DialogContent>
        </Dialog>
      </div>
      {searchTerm && <SearchResults customers={filteredCustomers} onSelect={handleCustomerSelect} />}
    </div>
  );
};
