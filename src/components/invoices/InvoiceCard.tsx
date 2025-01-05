import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InvoiceCardProps {
  invoice: {
    id: string;
    customer: string;
    amount: string;
    status: string;
    date: string;
    type?: 'one-time' | 'recurring';
  };
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onShare: (id: string) => void;
}

export const InvoiceCard = ({ invoice, onDelete, onDuplicate, onShare }: InvoiceCardProps) => {
  const navigate = useNavigate();
  
  const formattedDate = new Date(invoice.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const type = invoice.type === 'one-time' ? 'One-time' : 'Recurring';

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on a button or dropdown
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('[role="menuitem"]')
    ) {
      return;
    }
    navigate(`/invoices/${invoice.id}`);
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div 
      className="md:border md:px-4 md:py-6 py-4 border-b last:border-b-0 px-4 cursor-pointer hover:bg-gray-50"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between gap-2 md:gap-6">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base md:text-lg truncate">{invoice.customer}</h3>
          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <span>{type}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-start gap-1 md:gap-3 shrink-0">
          <div className="text-right">
            <span className="font-semibold text-base md:text-lg block mb-2">{invoice.amount}</span>
            <span className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium inline-block",
              invoice.status === "paid" && "bg-green-100 text-green-800",
              invoice.status === "pending" && "bg-orange-100 text-orange-800",
              invoice.status === "overdue" && "bg-red-100 text-red-800"
            )}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="-mt-1">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <Link to={`/invoices/${invoice.id}`}>
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
        </div>
      </div>
    </div>
  );
};