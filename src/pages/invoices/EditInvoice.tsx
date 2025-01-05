import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { InvoiceStatusSelect, type InvoiceStatus } from "@/components/invoices/InvoiceStatusSelect";
import { InvoicePreview } from "@/components/invoices/InvoicePreview";
import { InvoiceHeader } from "@/components/invoices/InvoiceHeader";
import { PaymentDetails } from "@/components/invoices/PaymentDetails";

export default function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [status, setStatus] = useState<InvoiceStatus>("pending");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [invoiceId, setInvoiceId] = useState(id || "");
  const [dueDate, setDueDate] = useState("");
  const [paymentType, setPaymentType] = useState<"one-time" | "recurring">("one-time");

  const [invoice, setInvoice] = useState({
    number: id,
    date: "2024-01-01",
    currency: "NGN",
    customer: null,
    items: [
      {
        description: "Service",
        quantity: 1,
        price: 1000,
        amount: 1000
      }
    ],
    notes: "Thank you for your business",
    terms: "Net 30"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Invoice updated successfully",
    });
    navigate("/invoices");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Edit Invoice #{id}</h1>
        </div>
        <InvoiceStatusSelect 
          status={status} 
          onStatusChange={(newStatus) => {
            setStatus(newStatus);
            toast({
              title: "Status Updated",
              description: `Invoice status updated to ${newStatus}`,
            });
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="p-6">
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
                />

                <PaymentDetails
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={setSelectedCurrency}
                  invoice={invoice}
                  onInvoiceChange={setInvoice}
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
          />
        </div>
      </div>
    </div>
  );
}