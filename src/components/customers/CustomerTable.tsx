import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface CustomerTableProps {
  customers: any[];
  selectedCustomers: string[];
  onSelectCustomer: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (customer: any) => void;
}

export const CustomerTable = ({
  customers,
  selectedCustomers,
  onSelectCustomer,
  onSelectAll,
  onDelete,
  onEdit,
}: CustomerTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={
                customers.length > 0 &&
                selectedCustomers.length === customers.length
              }
              onCheckedChange={(checked: boolean) => onSelectAll(checked)}
            />
          </TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden md:table-cell">Date Added</TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead className="hidden md:table-cell">Phone</TableHead>
          <TableHead className="text-right">Total Spent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow 
            key={customer.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleRowClick(customer.id)}
          >
            <TableCell className="w-12" onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={selectedCustomers.includes(customer.id)}
                onCheckedChange={(checked: boolean) =>
                  onSelectCustomer(customer.id, checked)
                }
              />
            </TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDate(customer.date)}
            </TableCell>
            <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
            <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
            <TableCell className="text-right">{customer.totalSpent}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};