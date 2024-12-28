import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface ReceiptTableHeaderProps {
  onSelectAll: (checked: boolean) => void;
  isAllSelected: boolean;
}

export function ReceiptTableHeader({ onSelectAll, isAllSelected }: ReceiptTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={onSelectAll}
            aria-label="Select all receipts"
          />
        </TableHead>
        <TableHead className="w-[40%]">Details</TableHead>
        <TableHead className="w-[20%]">Amount</TableHead>
        <TableHead className="w-[20%]">Status</TableHead>
        <TableHead className="w-[10%] text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}