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
import { ModernInvoiceTemplate } from "./ModernInvoiceTemplate";
import { ClassicInvoiceTemplate } from "./ClassicInvoiceTemplate";

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
    dueDate: new Date(invoice.date).toLocaleDateString(),
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
        <ClassicInvoiceTemplate 
          invoice={invoice}
          currencySymbol={currencySymbol}
        />
      )}

      <ShareModal 
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        invoiceId={invoice.number}
      />
    </div>
  );
}
