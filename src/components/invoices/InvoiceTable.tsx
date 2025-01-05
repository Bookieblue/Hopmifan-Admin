import { Link, useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    type?: 'one-time' | 'recurring';
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
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleRowClick = (e: React.MouseEvent, invoiceId: string) => {
    // Don't navigate if clicking checkbox, actions, or dropdown items
    if (
      (e.target as HTMLElement).closest('.checkbox-cell') ||
      (e.target as HTMLElement).closest('.actions-cell') ||
      (e.target as HTMLElement).closest('[role="menuitem"]')
    ) {
      return;
    }
    navigate(`/invoices/${invoiceId}/preview`);
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  if (isMobile) {
    return (
      <div className="-mx-4">
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
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr 
            key={invoice.id} 
            className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
            onClick={(e) => handleRowClick(e, invoice.id)}
          >
            <td className="px-4 py-3 checkbox-cell">
              <Checkbox
                checked={selectedInvoices.includes(invoice.id)}
                onCheckedChange={(checked) => onSelectInvoice(invoice.id, checked as boolean)}
                onClick={(e) => e.stopPropagation()}
              />
            </td>
            <td className="px-4 py-3 text-sm font-medium">{invoice.id}</td>
            <td className="px-4 py-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{invoice.customer}</span>
                <span className="text-sm text-gray-500">
                  {invoice.type === 'one-time' ? 'One-time' : 'Recurring'}•{formatDate(invoice.date)}
                </span>
              </div>
            </td>
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
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                  <Link to={`/invoices/${invoice.id}/preview`}>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      View
                    </DropdownMenuItem>
                  </Link>
                  <Link to={`/invoices/${invoice.id}/edit`}>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onSelect={(e) => handleAction(e as any, () => onDuplicate(invoice.id))}>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={(e) => handleAction(e as any, () => onShare(invoice.id))}>
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onSelect={(e) => handleAction(e as any, () => onDelete(invoice.id))}
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