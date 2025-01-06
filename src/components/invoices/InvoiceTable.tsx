import { useNavigate } from "react-router-dom";
import { InvoiceCard } from "./InvoiceCard";
import { DataTable, type TableColumn } from "@/components/shared/DataTable";

interface Invoice {
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
  type?: 'one-time' | 'recurring';
}

interface InvoiceTableProps {
  invoices: Invoice[];
  selectedInvoices: string[];
  onSelectInvoice: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onShare: (id: string) => void;
}

export const InvoiceTable = ({
  invoices,
  selectedInvoices,
  onSelectInvoice,
  onSelectAll,
  onDelete,
  onDuplicate,
  onShare
}: InvoiceTableProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const columns: TableColumn<Invoice>[] = [
    { header: 'Invoice #', accessor: 'id' },
    {
      header: 'Client',
      accessor: (invoice) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{invoice.customer}</span>
          <span className="text-sm text-gray-500">
            {invoice.type === 'one-time' ? 'One-time' : 'Recurring'}•{formatDate(invoice.date)}
          </span>
        </div>
      )
    },
    { header: 'Amount', accessor: 'amount' },
    {
      header: 'Status',
      accessor: (invoice) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          invoice.status === "paid" ? "bg-green-100 text-green-800" :
          invoice.status === "pending" ? "bg-orange-100 text-orange-800" :
          "bg-red-100 text-red-800"
        }`}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </span>
      )
    }
  ];

  return (
    <DataTable
      data={invoices}
      columns={columns}
      selectedItems={selectedInvoices}
      onSelectItem={onSelectInvoice}
      onSelectAll={onSelectAll}
      getItemId={(invoice) => invoice.id}
      actions={{
        onDelete,
        onDuplicate,
        onShare
      }}
      onRowClick={(id) => navigate(`/invoices/${id}/edit`)}
      CardComponent={InvoiceCard}
    />
  );
};