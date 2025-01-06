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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ModernInvoiceTemplate } from "./ModernInvoiceTemplate";
import { ClassicInvoiceTemplate } from "./ClassicInvoiceTemplate";
import MinimalInvoiceTemplate from "./MinimalInvoiceTemplate";
import ProfessionalQuoteTemplate from "./ProfessionalQuoteTemplate";

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
  const [template, setTemplate] = useState(selectedTemplate);
  const currencySymbol = selectedCurrency === 'NGN' ? '₦' : selectedCurrency;

  // Load template preference from settings
  useEffect(() => {
    const settings = localStorage.getItem('templateSettings');
    if (settings) {
      const { selectedTemplate } = JSON.parse(settings);
      if (selectedTemplate) {
        setTemplate(selectedTemplate);
      }
    }
  }, []);

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

  // Only include fields that have data
  const cleanInvoice = {
    ...invoice,
    customer: invoice.customer ? {
      name: invoice.customer.name || undefined,
      email: invoice.customer.email || undefined,
      street: invoice.customer.street || undefined,
      state: invoice.customer.state || undefined,
      postalCode: invoice.customer.postalCode || undefined
    } : undefined,
    notes: invoice.notes || undefined,
    terms: invoice.terms || undefined,
    footer: invoice.footer || undefined
  };

  // Transform invoice data for modern template
  const modernInvoiceData = {
    invoiceNumber: cleanInvoice.number || '',
    projectDesc: "Invoice",
    date: new Date(cleanInvoice.date).toLocaleDateString(),
    dueDate: new Date(cleanInvoice.date).toLocaleDateString(),
    companyName: "Your Company",
    companyAddress: "Your Address",
    companyPhone: "Your Phone",
    companyEmail: "your@email.com",
    clientName: cleanInvoice.customer?.name || '',
    clientAddress: cleanInvoice.customer?.street || '',
    clientPhone: "",
    clientEmail: cleanInvoice.customer?.email || '',
    status: "pending" as const,
    paymentType: "one-time" as const,
    items: cleanInvoice.items.map(item => ({
      description: item.description,
      cost: item.price,
      quantity: item.quantity.toString(),
      price: item.amount,
      unit: "item"
    })),
    customerNotes: cleanInvoice.notes,
    terms: cleanInvoice.terms,
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

      {template === 'modern' ? (
        <ModernInvoiceTemplate {...modernInvoiceData} />
      ) : template === 'minimal' ? (
        <MinimalInvoiceTemplate {...modernInvoiceData} />
      ) : template === 'professional' ? (
        <ProfessionalQuoteTemplate />
      ) : (
        <ClassicInvoiceTemplate 
          invoice={cleanInvoice}
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