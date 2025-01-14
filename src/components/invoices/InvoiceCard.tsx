import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Invoice } from "@/types/invoice";

interface InvoiceCardBaseProps {
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onShare?: (id: string) => void;
}

interface InvoiceCardDirectProps extends InvoiceCardBaseProps {
  invoice: Invoice;
}

interface InvoiceCardTableProps extends InvoiceCardBaseProps {
  item: Invoice;
  actions?: {
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
    onShare?: (id: string) => void;
  };
}

type InvoiceCardProps = InvoiceCardDirectProps | InvoiceCardTableProps;

export function InvoiceCard(props: InvoiceCardProps) {
  const invoice = 'invoice' in props ? props.invoice : props.item;
  const actions = 'actions' in props ? props.actions : {
    onDelete: props.onDelete,
    onDuplicate: props.onDuplicate,
    onShare: props.onShare
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link to={`/invoices/${invoice.id}/edit`}>
      <Card className="mb-4 p-4 hover:border-mint-200 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{invoice.customer}</p>
            <p className="text-sm text-muted-foreground">
              {invoice.type === 'one-time' ? 'One-time' : 'Recurring'} • {formatDate(invoice.date)}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <Link to={`/invoices/${invoice.id}/edit`}>
                <DropdownMenuItem>
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={(e) => {
                e.preventDefault();
                window.open(`/invoices/${invoice.id}/preview`, '_blank');
              }}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => {
                e.preventDefault();
                actions.onDuplicate?.(invoice.id);
              }}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => {
                e.preventDefault();
                actions.onShare?.(invoice.id);
              }}>
                Share
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.preventDefault();
                  actions.onDelete?.(invoice.id);
                }}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-lg font-semibold">{invoice.amount}</span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </span>
        </div>
      </Card>
    </Link>
  );
}