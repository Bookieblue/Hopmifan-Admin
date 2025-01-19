import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomerForm } from "@/components/customers/CustomerForm";

const initialCustomers = [
  { 
    id: "1",
    date: "15 Mar 2024",
    name: "Acme Corp",
    email: "billing@acme.com",
    phone: "+1 234 567 890",
    totalSpent: "₦12,500.00",
    street: "123 Business Ave",
    state: "Lagos",
    postalCode: "100001"
  },
  { 
    id: "2",
    date: "14 Mar 2024",
    name: "TechStart Solutions",
    email: "finance@techstart.com",
    phone: "+1 987 654 321",
    totalSpent: "₦8,750.00",
    street: "456 Innovation Way",
    state: "Abuja",
    postalCode: "900001"
  },
];

export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleSelectCustomer = (id: string, checked: boolean) => {
    setSelectedCustomers(prev =>
      checked ? [...prev, id] : prev.filter(customerId => customerId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedCustomers(checked ? filteredCustomers.map(c => c.id) : []);
  };

  const handleDelete = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    toast({
      title: "Customer deleted",
      description: "The customer has been successfully deleted.",
    });
  };

  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleCustomerSubmit = (customerData: any, isEdit = false) => {
    if (isEdit) {
      setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? { ...c, ...customerData } : c));
      setIsEditModalOpen(false);
      toast({
        title: "Success",
        description: "Customer updated successfully",
      });
    } else {
      const newCustomer = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
        ...customerData
      };
      setCustomers(prev => [...prev, newCustomer]);
      setIsAddModalOpen(false);
      toast({
        title: "Success",
        description: "Customer added successfully",
      });
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Customer
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <CustomerTable
          customers={filteredCustomers}
          selectedCustomers={selectedCustomers}
          onSelectCustomer={handleSelectCustomer}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm onSubmit={(data) => handleCustomerSubmit(data, false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm 
            initialData={selectedCustomer} 
            onSubmit={(data) => handleCustomerSubmit(data, true)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
