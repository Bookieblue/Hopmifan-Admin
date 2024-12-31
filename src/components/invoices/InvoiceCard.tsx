import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
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
  const formattedDate = new Date(invoice.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const type = invoice.type === 'one-time' ? 'One-time' : 'Recurring';

  return (
    <div className="px-4 py-6 border-b last:border-b-0 md:rounded-lg md:border md:shadow-sm md:m-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-base md:text-lg">{invoice.customer}</h3>
              <div className="mt-1 text-sm text-gray-600">
                <span>{type}</span>
                <span className="mx-2">•</span>
                <span>{formattedDate}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="-mt-1 -mr-2">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <span className="font-semibold text-base md:text-lg">{invoice.amount}</span>
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium w-fit",
          invoice.status === "paid" && "bg-green-100 text-green-800",
          invoice.status === "pending" && "bg-orange-100 text-orange-800",
          invoice.status === "overdue" && "bg-red-100 text-red-800"
        )}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </span>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="sr-only">Open menu</span>
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
    </div>
  );
};