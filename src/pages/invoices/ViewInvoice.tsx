import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/modals/ShareModal";

const ViewInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [invoice, setInvoice] = useState<any>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch the invoice data based on the ID
    const fetchInvoice = async () => {
      // Simulate fetching invoice data
      const fetchedInvoice = {
        id: "INV-2345",
        customer: "Acme Corporation",
        amount: "₦2,850.00",
        status: "pending",
        date: "2024-03-15",
        type: "one-time",
      };
      setInvoice(fetchedInvoice);
    };

    fetchInvoice();
  }, [id]);

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const printOptions = {
    documentTitle: `Invoice-${invoice?.id}`,
    onBeforePrint: () => console.log('Before printing...'),
    onAfterPrint: () => console.log('After printing...'),
    removeAfterPrint: true
  };

  return (
    <div className="p-6">
      {invoice ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{invoice.customer}</h2>
            <p className="text-sm text-gray-600">Invoice ID: {invoice.id}</p>
            <p className="text-sm text-gray-600">Date: {invoice.date}</p>
            <p className="text-lg font-bold">{invoice.amount}</p>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${invoice.status === "paid" ? "bg-green-100 text-green-800" : invoice.status === "pending" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
          </div>
          <Button onClick={handleShare} className="mr-2">Share</Button>
          <Button onClick={() => window.print()}>Print</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <ShareModal 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        invoiceId={invoice?.id}
      />
    </div>
  );
};

export default ViewInvoice;
