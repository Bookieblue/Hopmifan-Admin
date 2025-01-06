import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, MoreHorizontal, Plus, ArrowLeft, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { CustomerCard } from "@/components/invoices/CustomerCard";
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
  const navigate = useNavigate();
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

  const handleBulkDelete = () => {
    setCustomers(prev => prev.filter(customer => !selectedCustomers.includes(customer.id)));
    toast({
      title: "Customers deleted",
      description: `${selectedCustomers.length} customers have been deleted.`,
    });
    setSelectedCustomers([]);
  };

  const handleRowClick = (e: React.MouseEvent, customerId: string) => {
    if (
      (e.target as HTMLElement).closest('.checkbox-cell') ||
      (e.target as HTMLElement).closest('.actions-cell') ||
      (e.target as HTMLElement).closest('[role="menuitem"]')
    ) {
      return;
    }
    navigate(`/customers/${customerId}`);
  };

  if (isMobile) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Customers</h1>
          <Link to="/customers/create">
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={{
                name: customer.name,
                email: customer.email,
                street: customer.street,
                state: customer.state,
                postalCode: customer.postalCode,
              }}
              onEdit={() => navigate(`/customers/${customer.id}`)}
            />
          ))}
        </div>
      </div>
    );
  }

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
              onClick={handleBulkDelete}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedCustomers.length === filteredCustomers.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow 
                key={customer.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={(e) => handleRowClick(e, customer.id)}
              >
                <TableCell className="checkbox-cell">
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked as boolean)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">{customer.email}</span>
                    <span className="text-sm text-gray-500">{customer.phone}</span>
                  </div>
                </TableCell>
                <TableCell>{customer.totalSpent}</TableCell>
                <TableCell>{customer.date}</TableCell>
                <TableCell className="actions-cell">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}`)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}/edit`)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}