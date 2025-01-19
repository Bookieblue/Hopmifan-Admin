import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Receipt } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface PaymentRowProps {
  payment: {
    date: string;
    customer: string;
    amount: string;
    method: string;
    reference: string;
    type: "Book" | "Donation";
  };
  isSelected: boolean;
  onSelect: (reference: string, checked: boolean) => void;
  onDownloadReceipt: (reference: string) => void;
}

export function PaymentRow({ payment, isSelected, onSelect, onDownloadReceipt }: PaymentRowProps) {
  const { toast } = useToast();

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(payment.reference, checked as boolean)}
          aria-label={`Select payment ${payment.reference}`}
        />
      </TableCell>
      <TableCell>{payment.date}</TableCell>
      <TableCell>{payment.customer}</TableCell>
      <TableCell>{payment.amount}</TableCell>
      <TableCell>{payment.method}</TableCell>
      <TableCell>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          payment.type === 'Book' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {payment.type}
        </span>
      </TableCell>
      <TableCell>{payment.reference}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDownloadReceipt(payment.reference)}>
              <Receipt className="w-4 h-4 mr-2" />
              Download Receipt
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}