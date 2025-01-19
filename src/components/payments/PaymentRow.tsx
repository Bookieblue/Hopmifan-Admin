import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Payment {
  reference: string;
  date: string;
  customer: string;
  amount: string;
  method: string;
  type: string;
}

interface PaymentRowProps {
  payment: Payment;
  isSelected: boolean;
  onSelect: (reference: string, checked: boolean) => void;
  onDownloadReceipt: (reference: string) => void;
}

export function PaymentRow({ payment, isSelected, onSelect, onDownloadReceipt }: PaymentRowProps) {
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
      <TableCell>{payment.reference}</TableCell>
      <TableCell>{payment.type}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDownloadReceipt(payment.reference)}
        >
          <Download className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}