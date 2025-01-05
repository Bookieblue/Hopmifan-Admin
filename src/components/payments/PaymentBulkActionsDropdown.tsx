import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PaymentBulkActionsDropdownProps {
  selectedCount: number;
  onBulkDownload: () => void;
  onExportCSV: () => void;
}

export function PaymentBulkActionsDropdown({
  selectedCount,
  onBulkDownload,
  onExportCSV,
}: PaymentBulkActionsDropdownProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-4 py-4 px-6 border-t">
      <span className="text-sm text-gray-500">
        {selectedCount} {selectedCount === 1 ? 'payment' : 'payments'} selected
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Bulk Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem onClick={onBulkDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download Receipts
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportCSV}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export as CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}