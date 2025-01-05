import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Share, CreditCard, ArrowLeft } from "lucide-react";
import { ShareModal } from "@/components/modals/ShareModal";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PreviewInvoice() {
  const { id } = useParams<{ id: string }>();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [invoice, setInvoice] = useState({
    id: id,
    number: `INV-${id}`,
    date: new Date().toISOString().split('T')[0],
    customer: {
      name: "Acme Corporation",
      email: "billing@acme.com",
      street: "123 Business Ave",
      state: "California",
      postalCode: "94105"
    },
    items: [
      {
        description: "Website Development",
        quantity: 1,
        price: 2500,
        amount: 2500
      }
    ],
    notes: "Please include invoice number in payment reference",
    terms: "Payment is due within 30 days",
    footer: "Thank you for your business"
  });

  const handleDownload = (format: 'pdf' | 'jpg') => {
    toast.success(`Downloading invoice as ${format.toUpperCase()}`);
  };

  const handlePaymentPage = () => {
    toast.success("Redirecting to payment page");
    window.open('https://paystack.com/pay/afrika-mom-braids-store', '_blank');
  };

  return (
    <div className="bg-[#F9FAFB] p-6 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Link 
            to="/invoices" 
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDownload('pdf')}>
                Download as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('jpg')}>
                Download as JPG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShareModalOpen(true)}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePaymentPage}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Payment page
          </Button>
        </div>

        <Card className="bg-white p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-blue-600">Cordlo Invoice</h2>
              <div className="text-right">
                <div className="text-xl font-semibold">#{invoice.number}</div>
                <div className="text-gray-500">
                  Date: {new Date(invoice.date).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Bill To:</h3>
              <div>{invoice.customer.name}</div>
              <div>{invoice.customer.email}</div>
              <div className="text-gray-600">
                {invoice.customer.street}
                {invoice.customer.state && `, ${invoice.customer.state}`}
                {invoice.customer.postalCode && ` ${invoice.customer.postalCode}`}
              </div>
            </div>

            <div className="mt-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Description</th>
                    <th className="text-center py-2">Quantity</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-right py-2">₦{item.price.toLocaleString()}</td>
                      <td className="text-right py-2">₦{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-right pt-4 font-semibold">Total:</td>
                    <td className="text-right pt-4 font-semibold">
                      ₦{invoice.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {invoice.notes && (
              <div className="mt-8 space-y-2">
                <h3 className="font-semibold">Notes:</h3>
                <p className="text-gray-600">{invoice.notes}</p>
              </div>
            )}

            {invoice.terms && (
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold">Terms & Conditions:</h3>
                <p className="text-gray-600">{invoice.terms}</p>
              </div>
            )}

            {invoice.footer && (
              <div className="mt-8 pt-4 border-t text-center text-gray-500">
                {invoice.footer}
              </div>
            )}
          </div>
        </Card>
      </div>

      <ShareModal 
        open={shareModalOpen} 
        onOpenChange={setShareModalOpen}
        invoiceId={invoice.id}
      />
    </div>
  );
}