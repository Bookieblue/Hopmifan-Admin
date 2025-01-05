import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShareModal } from "@/components/modals/ShareModal";
import { ReceiptListHeader } from "@/components/receipts/ReceiptListHeader";
import { Table, TableBody } from "@/components/ui/table";
import { ReceiptTableHeader } from "@/components/receipts/ReceiptTableHeader";
import { ReceiptRow } from "@/components/receipts/ReceiptRow";

export default function ReceiptList() {
  const { toast } = useToast();
  const [receipts] = useState([
    { 
      id: "RCP-001",
      client: "Global Inc",
      date: "2024-03-15",
      amount: "₦999.00",
      status: "paid",
      type: "recurring"
    },
    { 
      id: "RCP-002",
      client: "TechStart Inc",
      date: "2024-03-14",
      amount: "₦1,500.00",
      status: "pending",
      type: "one-time"
    },
  ]);

  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState<string>("");

  const handleSelectReceipt = (receiptId: string, checked: boolean) => {
    if (checked) {
      setSelectedReceipts([...selectedReceipts, receiptId]);
    } else {
      setSelectedReceipts(selectedReceipts.filter(id => id !== receiptId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReceipts(receipts.map(receipt => receipt.id));
    } else {
      setSelectedReceipts([]);
    }
  };

  const handleDelete = (receiptId: string) => {
    toast({
      description: `Receipt ${receiptId} has been deleted successfully.`
    });
  };

  const handleShare = (receiptId: string) => {
    setSelectedReceiptId(receiptId);
    setShareDialogOpen(true);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <ReceiptListHeader />

      <div className="bg-white md:rounded-lg md:border">
        <Table>
          <ReceiptTableHeader 
            onSelectAll={handleSelectAll}
            isAllSelected={selectedReceipts.length === receipts.length && receipts.length > 0}
          />
          <TableBody>
            {receipts.map((receipt) => (
              <ReceiptRow
                key={receipt.id}
                receipt={receipt}
                isSelected={selectedReceipts.includes(receipt.id)}
                onSelect={handleSelectReceipt}
                onDelete={handleDelete}
                onShare={handleShare}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <ShareModal 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        receiptId={selectedReceiptId}
      />
    </div>
  );
}