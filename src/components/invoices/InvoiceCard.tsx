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
  };
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onShare: (id: string) => void;
}

export const InvoiceCard = ({ invoice, onDelete, onDuplicate, onShare }: InvoiceCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-base md:text-lg">{invoice.customer}</h3>
        <span className="font-semibold text-base md:text-lg">{invoice.amount}</span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">Invoice #{invoice.id}</p>
        <p className="text-sm text-gray-600">{invoice.date}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium",
          invoice.status === "paid" && "bg-green-100 text-green-800",
          invoice.status === "pending" && "bg-orange-100 text-orange-800",
          invoice.status === "overdue" && "bg-red-100 text-red-800"
        )}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </span>
        
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