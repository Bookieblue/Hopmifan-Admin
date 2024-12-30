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
  const formattedId = invoice.id.replace('INV-2024-', '');
  const formattedDate = new Date(invoice.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-base md:text-lg">{invoice.customer}</h3>
        <div className="text-right">
          <span className="font-semibold text-base md:text-lg">{invoice.amount}</span>
          <div className="mt-1">
            <span className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              invoice.status === "paid" && "bg-green-100 text-green-800",
              invoice.status === "pending" && "bg-orange-100 text-orange-800",
              invoice.status === "overdue" && "bg-red-100 text-red-800"
            )}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-600">
        <span>#{formattedId}</span>
        <span className="mx-2">•</span>
        <span>{invoice.type || 'one-time'}</span>
        <span className="mx-2">•</span>
        <span>{formattedDate}</span>
      </div>
      
      <div className="flex justify-end mt-2">
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
      </div>
    </div>
  );
};