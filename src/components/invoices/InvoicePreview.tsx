import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShareModal } from "@/components/modals/ShareModal";
import { useState } from "react";
import { toast } from "sonner";
import ModernInvoiceTemplate from "./ModernInvoiceTemplate";

interface InvoicePreviewProps {
  invoice: {
    number?: string;
    date: string;
    customer?: {
      name: string;
      email: string;
      street?: string;
      state?: string;
      postalCode?: string;
    };
    items: Array<{
      description: string;
      quantity: number;
      price: number;
      amount: number;
    }>;
    notes?: string;
    terms?: string;
    footer?: string;
  };
  selectedCurrency: string;
  selectedGateway?: string | null;
  selectedTemplate?: string;
}

export function InvoicePreview({ 
  invoice, 
  selectedCurrency, 
  selectedGateway,
  selectedTemplate = 'classic' 
}: InvoicePreviewProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const currencySymbol = selectedCurrency === 'NGN' ? '₦' : selectedCurrency;
  
  const handleDownload = (format: 'pdf' | 'jpg') => {
    toast.success(`Downloading invoice as ${format.toUpperCase()}`);
    const element = document.createElement('a');
    element.href = '#';
    element.download = `invoice-${invoice.number}.${format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePaymentPage = () => {
    if (selectedGateway) {
      toast.success("Redirecting to payment page");
      window.open('https://paystack.com/pay/afrika-mom-braids-store', '_blank');
    }
  };

  // Transform invoice data for modern template
  const modernInvoiceData = {
    invoiceNumber: invoice.number || '',
    projectDesc: "Invoice",
    date: new Date(invoice.date).toLocaleDateString(),
    dueDate: new Date(invoice.date).toLocaleDateString(), // You might want to use actual due date
    companyName: "Your Company",
    companyAddress: "Your Address",
    companyPhone: "Your Phone",
    companyEmail: "your@email.com",
    clientName: invoice.customer?.name || '',
    clientAddress: invoice.customer?.street || '',
    clientPhone: "",
    clientEmail: invoice.customer?.email || '',
    status: "pending" as const,
    paymentType: "one-time" as const,
    items: invoice.items.map(item => ({
      description: item.description,
      cost: item.price,
      quantity: item.quantity.toString(),
      price: item.amount,
      unit: "item"
    })),
    customerNotes: invoice.notes,
    terms: invoice.terms,
    bankDetails: {
      bankName: "Bank Name",
      accountName: "Account Name",
      accountNumber: "Account Number",
      swiftCode: "SWIFT Code",
      routingNumber: "Routing Number"
    },
    paymentLink: "https://payment.link"
  };

  return (
    <div className="bg-[#F9FAFB] p-6 h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Preview</h2>
        
        <div className="flex flex-wrap gap-2">
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

          {selectedGateway && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePaymentPage}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Payment page
            </Button>
          )}
        </div>
      </div>

      {selectedTemplate === 'modern' ? (
        <ModernInvoiceTemplate {...modernInvoiceData} />
      ) : (
        <Card className="bg-white p-8 mt-4">
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

          {invoice.customer && (
            <div className="space-y-2">
              <h3 className="font-semibold">Bill To:</h3>
              <div>{invoice.customer.name}</div>
              <div>{invoice.customer.email}</div>
              {invoice.customer.street && (
                <div className="text-gray-600">
                  {invoice.customer.street}
                  {invoice.customer.state && `, ${invoice.customer.state}`}
                  {invoice.customer.postalCode && ` ${invoice.customer.postalCode}`}
                </div>
              )}
            </div>
          )}

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
                    <td className="text-right py-2">{currencySymbol}{item.price.toLocaleString()}</td>
                    <td className="text-right py-2">{currencySymbol}{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-right pt-4 font-semibold">Total:</td>
                  <td className="text-right pt-4 font-semibold">
                    {currencySymbol}
                    {invoice.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
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
      )}

      <ShareModal 
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        invoiceId={invoice.number}
      />
    </div>
  );
}
