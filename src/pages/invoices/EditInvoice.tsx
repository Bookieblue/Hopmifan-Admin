import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { InvoiceStatusSelect, type InvoiceStatus } from "@/components/invoices/InvoiceStatusSelect";
import { InvoicePreview } from "@/components/invoices/InvoicePreview";
import { InvoiceHeader } from "@/components/invoices/InvoiceHeader";
import { PaymentDetails } from "@/components/invoices/PaymentDetails";
import { InvoiceItems } from "@/components/invoices/InvoiceItems";
import { AdditionalDetails } from "@/components/invoices/AdditionalDetails";
import type { InvoiceItem } from "@/types/invoice";

export default function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [status, setStatus] = useState<InvoiceStatus>("pending");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [invoiceId, setInvoiceId] = useState(id || "");
  const [dueDate, setDueDate] = useState("");
  const [paymentType, setPaymentType] = useState<"one-time" | "recurring">("one-time");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [selectedBankAccounts, setSelectedBankAccounts] = useState<string[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [notes, setNotes] = useState("Please include invoice number in payment reference");
  const [terms, setTerms] = useState("Payment is due within 30 days");
  const [footer, setFooter] = useState("");

  const [invoice, setInvoice] = useState({
    number: id,
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
    notes: notes,
    terms: terms
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Invoice updated successfully");
    navigate("/invoices");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/invoices")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Edit Invoice #{id}</h1>
        </div>
        <InvoiceStatusSelect 
          status={status} 
          onStatusChange={(newStatus) => {
            setStatus(newStatus);
            toast("Invoice status updated to " + newStatus);
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-8">
                <InvoiceHeader
                  invoiceId={invoiceId}
                  dueDate={dueDate}
                  paymentType={paymentType}
                  onInvoiceIdChange={setInvoiceId}
                  onDueDateChange={setDueDate}
                  onPaymentTypeChange={setPaymentType}
                  onCustomerSelect={(customer) => {
                    setSelectedCustomer(customer);
                    setInvoice(prev => ({ ...prev, customer }));
                  }}
                  initialCustomer={selectedCustomer}
                />

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
                  onBankAccountAdd={(accountId) => setSelectedBankAccounts(prev => [...prev, accountId])}
                  onBankAccountRemove={(accountId) => setSelectedBankAccounts(prev => prev.filter(id => id !== accountId))}
                  onPaymentGatewayChange={setSelectedGateway}
                  notes={notes}
                  terms={terms}
                  footer={footer}
                  onNotesChange={setNotes}
                  onTermsChange={setTerms}
                  onFooterChange={setFooter}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/invoices")}
              >
                Cancel
              </Button>
              <Button type="submit">Update Invoice</Button>
            </div>
          </form>
        </div>

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
