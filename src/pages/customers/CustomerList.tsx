import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for the customers list with unique IDs
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
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Filter customers based on search term
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

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Link to="/customers/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Customer
          </Button>
        </Link>
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

      {selectedCustomers.length > 0 && (
        <div className="mb-4 p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {selectedCustomers.length} selected
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setCustomers(prev => prev.filter(customer => !selectedCustomers.includes(customer.id)));
                toast({
                  title: "Customers deleted",
                  description: `${selectedCustomers.length} customers have been deleted.`,
                });
                setSelectedCustomers([]);
              }}
              className="gap-2"
            >
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border">
        <CustomerTable
          customers={filteredCustomers}
          selectedCustomers={selectedCustomers}
          onSelectCustomer={handleSelectCustomer}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}