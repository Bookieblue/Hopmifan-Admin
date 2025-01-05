import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronDown, ChevronUp, FileText, Plus, Wallet } from "lucide-react";
import { toast } from "sonner";
import { InvoiceHeader } from "@/components/invoices/InvoiceHeader";
import { PaymentDetails } from "@/components/invoices/PaymentDetails";
import { InvoiceItems } from "@/components/invoices/InvoiceItems";
import { InvoicePreview } from "@/components/invoices/InvoicePreview";
import { generateInvoiceId } from "@/lib/utils";
import { InvoiceStatusSelect, type InvoiceStatus } from "@/components/invoices/InvoiceStatusSelect";
import type { InvoiceItem } from "@/types/invoice";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PaymentMethodSelect } from "@/components/invoices/payment/PaymentMethodSelect";

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [invoiceId, setInvoiceId] = useState(generateInvoiceId());
  const [dueDate, setDueDate] = useState("");
  const [paymentType, setPaymentType] = useState<"one-time" | "recurring">("one-time");
  const [selectedBankAccounts, setSelectedBankAccounts] = useState<string[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [status, setStatus] = useState<InvoiceStatus>("draft");
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [isAttachmentsOpen, setIsAttachmentsOpen] = useState(false);
  
  const [invoice, setInvoice] = useState({
    number: invoiceId,
    date: new Date().toISOString().split('T')[0],
    currency: selectedCurrency,
    customer: null,
    items: [{
      id: Math.random().toString(36).substr(2, 9),
      description: "Service",
      quantity: 1,
      price: 1000,
      amount: 1000
    }],
    notes: "Thank you for your business",
    terms: "Net 30"
  });

  useEffect(() => {
    const fetchTemplateContent = async () => {
      const templateContent = {
        notesTemplate: "Please include invoice number in payment reference",
        termsAndConditions: "Payment is due within 30 days"
      };
      
      setInvoice(prev => ({
        ...prev,
        notes: templateContent.notesTemplate,
        terms: templateContent.termsAndConditions
      }));
    };

    fetchTemplateContent();
  }, []);

  useEffect(() => {
    setInvoice(prev => ({
      ...prev,
      number: invoiceId,
      date: new Date().toISOString().split('T')[0],
      currency: selectedCurrency,
      customer: selectedCustomer,
      items: items
    }));
  }, [invoiceId, selectedCurrency, selectedCustomer, items]);

  const handleSubmit = async (status: 'draft' | 'published') => {
    try {
      const invoiceData = {
        id: invoiceId,
        dueDate,
        paymentType,
        bankAccounts: selectedBankAccounts,
        paymentGateway: selectedGateway,
        items,
        notes: invoice.notes,
        terms: invoice.terms,
        status,
        customer: selectedCustomer,
        total: items.reduce((sum, item) => sum + item.amount, 0)
      };

      console.log('Saving invoice:', invoiceData);
      
      toast.success(
        status === 'draft' 
          ? "Invoice saved as draft" 
          : "Invoice created successfully"
      );
      
      navigate('/invoices');
    } catch (error) {
      toast.error("Failed to create invoice");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/invoices")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Create Invoice</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form className="space-y-8">
          <Card>
            <CardContent className="p-6 space-y-8">
              <InvoiceHeader
                invoiceId={invoiceId}
                dueDate={dueDate}
                paymentType={paymentType}
                onInvoiceIdChange={setInvoiceId}
                onDueDateChange={setDueDate}
                onPaymentTypeChange={setPaymentType}
                onCustomerSelect={setSelectedCustomer}
              />

              <PaymentDetails
                selectedBankAccounts={selectedBankAccounts}
                selectedGateway={selectedGateway}
                onBankAccountAdd={(accountId) => setSelectedBankAccounts(prev => [...prev, accountId])}
                onBankAccountRemove={(accountId) => setSelectedBankAccounts(prev => prev.filter(id => id !== accountId))}
                onPaymentGatewayChange={setSelectedGateway}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Items</h3>
                <InvoiceItems
                  items={items}
                  onItemsChange={setItems}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Details</h3>
                
                <Card className="border rounded-lg">
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full flex justify-between p-4 hover:bg-accent">
                        <span className="flex items-center gap-2">
                          <Wallet className="w-4 h-4" />
                          Payment Methods
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0">
                      <PaymentMethodSelect 
                        selectedBankAccounts={selectedBankAccounts}
                        selectedGateway={selectedGateway}
                        onBankAccountAdd={(accountId) => setSelectedBankAccounts(prev => [...prev, accountId])}
                        onBankAccountRemove={(accountId) => setSelectedBankAccounts(prev => prev.filter(id => id !== accountId))}
                        onPaymentGatewayChange={setSelectedGateway}
                        bankAccounts={[
                          { id: '1', name: "First Bank Account" },
                          { id: '2', name: "Second Bank Account" }
                        ]}
                        paymentGateways={[
                          { id: 'stripe', name: "Stripe" },
                          { id: 'paypal', name: "PayPal" }
                        ]}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                <Card className="border rounded-lg">
                  <Collapsible open={isNotesOpen} onOpenChange={setIsNotesOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full flex justify-between p-4 hover:bg-accent">
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Notes
                        </span>
                        {isNotesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0">
                      <Textarea
                        value={invoice.notes}
                        onChange={(e) => setInvoice(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Add notes..."
                      />
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                <Card className="border rounded-lg">
                  <Collapsible open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full flex justify-between p-4 hover:bg-accent">
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Terms & Conditions
                        </span>
                        {isTermsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0">
                      <Textarea
                        value={invoice.terms}
                        onChange={(e) => setInvoice(prev => ({ ...prev, terms: e.target.value }))}
                        placeholder="Add terms and conditions..."
                      />
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                <Card className="border rounded-lg">
                  <Collapsible open={isFooterOpen} onOpenChange={setIsFooterOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full flex justify-between p-4 hover:bg-accent">
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Footer
                        </span>
                        {isFooterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0">
                      <Textarea
                        placeholder="Add footer text..."
                        onChange={(e) => setInvoice(prev => ({ ...prev, footer: e.target.value }))}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                <div className="mt-4">
                  <InvoiceStatusSelect 
                    status={status} 
                    onStatusChange={setStatus}
                  />
                </div>
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
  );
}
