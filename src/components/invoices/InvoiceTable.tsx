import { Checkbox } from "@/components/ui/checkbox";
import { InvoiceCard } from "./InvoiceCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface InvoiceTableProps {
  invoices: Array<{
    id: string;
    customer: string;
    amount: string;
    status: string;
    date: string;
  }>;
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
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onShare={onShare}
          />
        ))}
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-3 text-left">
            <Checkbox
              checked={selectedInvoices.length === invoices.length}
              onCheckedChange={onSelectAll}
            />
          </th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Invoice #</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Client</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id} className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer">
            <td className="px-4 py-3 checkbox-cell">
              <Checkbox
                checked={selectedInvoices.includes(invoice.id)}
                onCheckedChange={(checked) => onSelectInvoice(invoice.id, checked as boolean)}
              />
            </td>
            <td className="px-4 py-3 text-sm font-medium">{invoice.id}</td>
            <td className="px-4 py-3 text-sm">{invoice.customer}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{invoice.date}</td>
            <td className="px-4 py-3 text-sm font-medium">{invoice.amount}</td>
            <td className="px-4 py-3">
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                invoice.status === "paid" && "bg-green-100 text-green-800",
                invoice.status === "pending" && "bg-orange-100 text-orange-800",
                invoice.status === "overdue" && "bg-red-100 text-red-800"
              )}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
            </td>
            <td className="px-4 py-3 text-right actions-cell">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to={`/invoices/${invoice.id}`}>
                    <DropdownMenuItem>View</DropdownMenuItem>
                  </Link>
                  <Link to={`/invoices/${invoice.id}/edit`}>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => onDuplicate(invoice.id)}>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onShare(invoice.id)}>
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(invoice.id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
