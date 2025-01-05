import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PaymentBulkActionsProps {
  selectedCount: number;
  onBulkDownload: () => void;
  onExportCSV: () => void;
}

export function PaymentBulkActions({ selectedCount, onBulkDownload, onExportCSV }: PaymentBulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-gray-500">
        {selectedCount} {selectedCount === 1 ? 'payment' : 'payments'} selected
      </span>
      <Button variant="outline" size="sm" onClick={onBulkDownload}>
        Download Receipts
      </Button>
      <Button variant="outline" size="sm" onClick={onExportCSV}>
        <Download className="w-4 h-4 mr-2" />
        Export as CSV
      </Button>
    </div>
  );
}