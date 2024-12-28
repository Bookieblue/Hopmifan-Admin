import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Pencil, Printer, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ShareModal } from "@/components/modals/ShareModal";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

type EstimateStatus = "draft" | "sent" | "accepted" | "declined";

export default function ViewEstimate() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const estimate = {
    id: "EST-001",
    date: "2024-03-15",
    status: "draft" as EstimateStatus,
    validUntil: "2024-04-15",
    client: {
      name: "Global Inc",
      email: "accounts@global.com",
      phone: "+1 234 567 890",
      address: "789 Global Plaza, Global City, 12345"
    },
    items: [
      {
        description: "Consulting Services",
        quantity: 1,
        price: "₦1,500.00",
        amount: "₦1,500.00"
      }
    ],
    subtotal: "₦1,500.00",
    tax: "₦150.00",
    total: "₦1,650.00",
    notes: "This estimate is valid for 30 days",
    terms: "50% payment required to begin work"
  };

  const handlePrint = useReactToPrint({
    documentTitle: `Estimate-${estimate.id}`,
    onAfterPrint: () => console.log('Printed successfully'),
    content: () => printRef.current,
  } as any);

  const handleStatusChange = (newStatus: EstimateStatus) => {
    console.log('Updating status to:', newStatus);
    toast(`Estimate status updated to ${newStatus}`);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1000px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/estimates">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-semibold">Estimate #{estimate.id}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={() => handlePrint()}
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => setIsShareModalOpen(true)}>
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Link to={`/estimates/${estimate.id}/edit`}>
            <Button className="gap-2">
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div ref={printRef}>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-blue-600">Cordlo Estimate</h2>
              </div>
              <div className="text-left md:text-right">
                <h3 className="text-lg md:text-xl font-semibold">ESTIMATE #{estimate.id}</h3>
                <p className="text-gray-600">Date: {estimate.date}</p>
                <p className="text-gray-600">Valid Until: {estimate.validUntil}</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-medium text-gray-600 mb-2">For:</h4>
              <div className="space-y-1">
                <p className="font-medium">{estimate.client.name}</p>
                <p>{estimate.client.email}</p>
                <p>{estimate.client.phone}</p>
                <p>{estimate.client.address}</p>
              </div>
            </div>

            <div className="mb-8 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Description</th>
                    <th className="text-center py-2">Quantity</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-right py-2">{item.price}</td>
                      <td className="text-right py-2">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mb-8">
              <div className="w-full md:w-72">
                <div className="flex justify-between py-2">
                  <span>Subtotal:</span>
                  <span>{estimate.subtotal}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Tax (10%):</span>
                  <span>{estimate.tax}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span>Total:</span>
                  <span>{estimate.total}</span>
                </div>
              </div>
            </div>

            {estimate.notes && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-gray-600">{estimate.notes}</p>
              </div>
            )}

            {estimate.terms && (
              <div>
                <h4 className="font-medium mb-2">Terms & Conditions</h4>
                <p className="text-gray-600">{estimate.terms}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ShareModal 
        open={isShareModalOpen}
        onOpenChange={setIsShareModalOpen}
        invoiceId={estimate.id}
      />
    </div>
  );
}