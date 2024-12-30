import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/modals/ShareModal";

const ViewReceipt = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [receipt, setReceipt] = useState<any>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch receipt data based on the ID
    const fetchReceipt = async () => {
      try {
        const response = await fetch(`/api/receipts/${id}`);
        const data = await response.json();
        setReceipt(data);
      } catch (error) {
        toast({
          description: "Failed to fetch receipt data.",
        });
      }
    };

    fetchReceipt();
  }, [id, toast]);

  const printOptions = {
    documentTitle: `Receipt-${receipt?.id}`,
    onBeforePrint: () => console.log('Before printing...'),
    onAfterPrint: () => console.log('After printing...'),
    removeAfterPrint: true
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Receipt Details</h1>
      {receipt ? (
        <div>
          <h2 className="text-xl">{receipt.title}</h2>
          <p>ID: {receipt.id}</p>
          <p>Amount: {receipt.amount}</p>
          <p>Date: {new Date(receipt.date).toLocaleDateString()}</p>
          <Button onClick={handleShare}>Share Receipt</Button>
          <Button onClick={() => window.print()}>Print Receipt</Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ShareModal 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        receiptId={receipt?.id}
      />
    </div>
  );
};

export default ViewReceipt;
