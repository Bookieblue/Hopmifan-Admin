import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface PaymentTableHeaderProps {
  onSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
}

export function PaymentTableHeader({ onSelectAll, isAllSelected }: PaymentTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={onSelectAll}
            aria-label="Select all payments"
          />
        </TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Method</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Reference</TableHead>
        <TableHead className="w-[48px]"></TableHead>
      </TableRow>
    </TableHeader>
  );
}