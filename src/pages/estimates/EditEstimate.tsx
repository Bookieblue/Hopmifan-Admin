import { useParams, useNavigate, Link } from "react-router-dom";
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

export default function EditEstimate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [status, setStatus] = useState<InvoiceStatus>("pending");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [estimateId, setEstimateId] = useState(id || "");
  const [dueDate, setDueDate] = useState("");
  const [paymentType, setPaymentType] = useState<"one-time" | "recurring">("one-time");
  const [selectedBankAccounts, setSelectedBankAccounts] = useState<string[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([{
    id: Math.random().toString(36).substr(2, 9),
    description: "Service",
    quantity: 1,
    price: 1000,
    amount: 1000
  }]);
  const [notes, setNotes] = useState("Please review this estimate");
  const [terms, setTerms] = useState("This estimate is valid for 30 days");
  const [footer, setFooter] = useState("");

  const [estimate, setEstimate] = useState({
    number: id,
    date: new Date().toISOString().split('T')[0],
    currency: selectedCurrency,
    customer: null,
    items: items,
    notes: notes,
    terms: terms
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const estimateData = {
        id: estimateId,
        dueDate,
        paymentType,
        bankAccounts: selectedBankAccounts,
        paymentGateway: selectedGateway,
        items,
        notes,
        terms,
        status,
        customer: selectedCustomer,
        total: items.reduce((sum, item) => sum + item.amount, 0)
      };

      console.log('Updating estimate:', estimateData);
      
      toast.success("Estimate updated successfully");
      navigate("/estimates");
    } catch (error) {
      toast.error("Failed to update estimate");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/estimates">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Edit Estimate #{id}</h1>
        </div>
        <InvoiceStatusSelect 
          status={status} 
          onStatusChange={(newStatus) => {
            setStatus(newStatus);
            toast.success(`Estimate status updated to ${newStatus}`);
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardContent className="p-6 space-y-8">
              <InvoiceHeader
                invoiceId={estimateId}
                dueDate={dueDate}
                paymentType={paymentType}
                onInvoiceIdChange={setEstimateId}
                onDueDateChange={setDueDate}
                onPaymentTypeChange={setPaymentType}
                onCustomerSelect={(customer) => {
                  setSelectedCustomer(customer);
                  setEstimate(prev => ({ ...prev, customer }));
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
              onClick={() => navigate("/estimates")}
            >
              Cancel
            </Button>
            <Button type="submit">Update Estimate</Button>
          </div>
        </form>

        <div className="hidden lg:block sticky top-6">
          <InvoicePreview 
            invoice={estimate}
            selectedCurrency={selectedCurrency}
            selectedGateway={selectedGateway}
          />
        </div>
      </div>
    </div>
  );
}