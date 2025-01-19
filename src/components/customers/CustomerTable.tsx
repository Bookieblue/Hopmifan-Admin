import { useNavigate } from "react-router-dom";
import { DataTable, type TableColumn } from "@/components/shared/DataTable";
import { CustomerCard } from "@/components/invoices/CustomerCard";
import { useState } from "react";
import { ContactDetailsModal } from "@/components/contacts/ContactDetailsModal";

interface Customer {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: string;
  billingAddress?: string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  country: string;
  cityState: string;
  preferredContact: string;
  message: string;
  dateSubmitted: string;
  status: string;
}

interface CustomerTableProps {
  customers: Customer[];
  selectedCustomers: string[];
  onSelectCustomer: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (customer: Customer) => void;
  onStatusChange: (id: string, status: string) => void;
}

export const CustomerTable = ({
  customers,
  selectedCustomers,
  onSelectCustomer,
  onSelectAll,
  onDelete,
  onEdit,
  onStatusChange,
}: CustomerTableProps) => {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<Customer | null>(null);

  const columns: TableColumn<Customer>[] = [
    { 
      header: 'Name', 
      accessor: (customer) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{`${customer.firstName} ${customer.lastName}`}</span>
          <span className="text-sm text-gray-500">{customer.email}</span>
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: (customer) => (
        <div className="flex flex-col">
          <span className="text-sm">{customer.phone}</span>
          <span className="text-sm text-gray-500 capitalize">{customer.preferredContact}</span>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: (customer) => (
        <div className="flex flex-col">
          <span className="text-sm">{customer.country}</span>
          <span className="text-sm text-gray-500">{customer.cityState}</span>
        </div>
      )
    },
    {
      header: 'Status & Date',
      accessor: (customer) => (
        <div className="flex flex-col">
          <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
            customer.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {customer.status === 'replied' ? 'Replied' : 'Pending'}
          </span>
          <span className="text-sm text-gray-500 mt-1">{customer.dateSubmitted}</span>
        </div>
      )
    }
  ];

  const handleRowClick = (id: string) => {
    const contact = customers.find(c => c.id === id);
    if (contact) {
      setSelectedContact(contact);
    }
  };

  return (
    <>
      <DataTable
        data={customers}
        columns={columns}
        selectedItems={selectedCustomers}
        onSelectItem={onSelectCustomer}
        onSelectAll={onSelectAll}
        getItemId={(customer) => customer.id}
        onRowClick={handleRowClick}
        CardComponent={CustomerCard}
      />

      <ContactDetailsModal
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        contact={selectedContact}
        onStatusChange={onStatusChange}
      />
    </>
  );
};