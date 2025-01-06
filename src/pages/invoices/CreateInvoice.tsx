import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { InvoiceHeader } from "@/components/invoices/InvoiceHeader";
import { PaymentDetails } from "@/components/invoices/PaymentDetails";
import { InvoiceItems } from "@/components/invoices/InvoiceItems";
import { InvoicePreview } from "@/components/invoices/InvoicePreview";
import { generateInvoiceId } from "@/lib/utils";
import { InvoiceStatusSelect, type InvoiceStatus } from "@/components/invoices/InvoiceStatusSelect";
import type { InvoiceItem } from "@/types/invoice";
import { AdditionalDetails } from "@/components/invoices/AdditionalDetails";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import confetti from 'canvas-confetti';

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [invoiceId, setInvoiceId] = useState(generateInvoiceId());
  const [dueDate, setDueDate] = useState("");
  const [paymentType, setPaymentType] = useState<"one-time" | "recurring">("one-time");
  const [selectedBankAccounts, setSelectedBankAccounts] = useState<string[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([{
    id: Math.random().toString(36).substr(2, 9),
    description: "Service 1",
    quantity: 1,
    price: 0,
    amount: 0,
    image: null
  }]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [status, setStatus] = useState<InvoiceStatus>("pending");
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [notes, setNotes] = useState("Please include invoice number in payment reference");
  const [terms, setTerms] = useState("Payment is due within 30 days");
  const [footer, setFooter] = useState("");
  
  // Load business settings on mount
  useEffect(() => {
    const businessData = localStorage.getItem('businessData');
    if (businessData) {
      const { defaultCurrency } = JSON.parse(businessData);
      if (defaultCurrency) {
        setSelectedCurrency(defaultCurrency);
      }
    }
  }, []);

  const [invoice, setInvoice] = useState({
    number: invoiceId,
    date: new Date().toISOString().split('T')[0],
    currency: selectedCurrency,
    customer: null,
    items: items,
    notes: notes,
    terms: terms,
    footer: footer
  });

  // Update invoice state when relevant fields change
  useEffect(() => {
    setInvoice(prev => ({
      ...prev,
      customer: selectedCustomer,
      items: items,
      notes: notes,
      terms: terms,
      footer: footer,
      currency: selectedCurrency
    }));
  }, [selectedCustomer, items, notes, terms, footer, selectedCurrency]);

  const handleSubmit = async (status: 'draft' | 'published') => {
    try {
      const invoiceData = {
        id: invoiceId,
        dueDate,
        paymentType,
        bankAccounts: selectedBankAccounts,
        paymentGateway: selectedGateway,
        items,
        notes,
        terms,
        footer,
        status,
        customer: selectedCustomer,
        total: items.reduce((sum, item) => sum + item.amount, 0)
      };

      console.log('Saving invoice:', invoiceData);
      
      if (status === 'published') {
        setShowSuccessModal(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/invoices');
        }, 2000);
      } else {
        toast.success("Invoice saved as draft");
        navigate('/invoices');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error("Failed to create invoice");
    }
  };

  return (
    <>
      <div className="p-6 px-2.5 md:px-6">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/invoices")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold">Create New Invoice</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form className="space-y-8">
            <Card>
              <CardContent className="p-6 space-y-8">
                <div>
                  <h2 className="text-lg font-medium mb-4">Invoice Details</h2>
                  <InvoiceHeader
                    invoiceId={invoiceId}
                    dueDate={dueDate}
                    paymentType={paymentType}
                    onInvoiceIdChange={setInvoiceId}
                    onDueDateChange={setDueDate}
                    onPaymentTypeChange={setPaymentType}
                    onCustomerSelect={setSelectedCustomer}
                  />
                </div>

                <PaymentDetails
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={setSelectedCurrency}
                  paymentType={paymentType}
                  onPaymentTypeChange={setPaymentType}
                />

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Items</h3>
                  <InvoiceItems
                    items={items}
                    onItemsChange={setItems}
                  />
                </div>

                <AdditionalDetails
                  selectedBankAccounts={selectedBankAccounts}
                  selectedGateway={selectedGateway}
                  onBankAccountAdd={(accountId) => setSelectedBankAccounts([accountId])}
                  onBankAccountRemove={() => setSelectedBankAccounts([])}
                  onPaymentGatewayChange={setSelectedGateway}
                  notes={notes}
                  terms={terms}
                  footer={footer}
                  onNotesChange={setNotes}
                  onTermsChange={setTerms}
                  onFooterChange={setFooter}
                />

                <div className="mt-4">
                  <InvoiceStatusSelect 
                    status={status} 
                    onStatusChange={setStatus}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => handleSubmit('draft')}>
                Save as Draft
              </Button>
              <Button onClick={() => handleSubmit('published')}>
                Create Invoice
              </Button>
            </div>
          </form>

          <div className="hidden lg:block sticky top-6">
            <InvoicePreview 
              invoice={invoice}
              selectedCurrency={selectedCurrency}
              selectedGateway={selectedGateway}
            />
          </div>
        </div>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md text-center py-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Invoice Created!</h2>
            <p className="text-muted-foreground">
              Your invoice has been created successfully and is ready to be sent.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}