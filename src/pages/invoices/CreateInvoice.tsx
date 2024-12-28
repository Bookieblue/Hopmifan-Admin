import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { InvoiceHeader } from "@/components/invoices/InvoiceHeader";
import { PaymentDetails } from "@/components/invoices/PaymentDetails";
import { InvoiceItems } from "@/components/invoices/InvoiceItems";
import { generateInvoiceId } from "@/lib/utils";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [invoiceId] = useState(generateInvoiceId());
  const [dueDate, setDueDate] = useState("");
  const [paymentType, setPaymentType] = useState<"one-time" | "recurring">("one-time");
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [selectedGateway, setSelectedGateway] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [notes, setNotes] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");

  // Fetch default notes and terms from template settings
  useEffect(() => {
    // In a real app, this would fetch from your API
    const mockTemplateContent = {
      notesTemplate: "Thank you for your business",
      termsAndConditions: "Payment is due within 30 days"
    };
    
    setNotes(mockTemplateContent.notesTemplate);
    setTermsAndConditions(mockTemplateContent.termsAndConditions);
  }, []);

  const handleSubmit = async (status: 'draft' | 'published') => {
    try {
      const invoiceData = {
        id: invoiceId,
        dueDate,
        paymentType,
        bankAccount: selectedBankAccount,
        paymentGateway: selectedGateway,
        items,
        notes,
        termsAndConditions,
        status,
        total: items.reduce((sum, item) => sum + item.amount, 0)
      };

      // In a real app, this would be an API call
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
    <div className="p-6 max-w-[1000px] mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/invoices">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Create Invoice</h1>
      </div>

      <form className="space-y-8">
        <Card>
          <CardContent className="p-6 space-y-8">
            <InvoiceHeader
              invoiceId={invoiceId}
              dueDate={dueDate}
              paymentType={paymentType}
              onDueDateChange={setDueDate}
              onPaymentTypeChange={setPaymentType}
            />

            <PaymentDetails
              onBankAccountChange={setSelectedBankAccount}
              onPaymentGatewayChange={setSelectedGateway}
            />

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Items</h3>
              <InvoiceItems
                items={items}
                onItemsChange={setItems}
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Terms & Conditions</label>
                <Textarea
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  placeholder="Add terms and conditions..."
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
    </div>
  );
}