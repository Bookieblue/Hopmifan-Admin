import { useNavigate } from "react-router-dom";
import { DataTable, type TableColumn } from "@/components/shared/DataTable";
import { CustomerCard } from "@/components/invoices/CustomerCard";

interface Customer {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: string;
  street?: string;
  state?: string;
  postalCode?: string;
}

interface CustomerTableProps {
  customers: Customer[];
  selectedCustomers: string[];
  onSelectCustomer: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onDelete: (id: string) => void;
}

export const CustomerTable = ({
  customers,
  selectedCustomers,
  onSelectCustomer,
  onSelectAll,
  onDelete,
}: CustomerTableProps) => {
  const navigate = useNavigate();

  const columns: TableColumn<Customer>[] = [
    { header: 'Name', accessor: 'name' },
    {
      header: 'Contact',
      accessor: (customer) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{customer.email}</span>
          <span className="text-sm text-gray-500">{customer.phone}</span>
        </div>
      )
    },
    { header: 'Total Spent', accessor: 'totalSpent' },
    { header: 'Date Added', accessor: 'date' }
  ];

  return (
    <DataTable
      data={customers}
      columns={columns}
      selectedItems={selectedCustomers}
      onSelectItem={onSelectCustomer}
      onSelectAll={onSelectAll}
      getItemId={(customer) => customer.id}
      actions={{
        onDelete,
      }}
      onRowClick={(id) => navigate(`/customers/${id}`)}
      CardComponent={CustomerCard}
    />
  );
};