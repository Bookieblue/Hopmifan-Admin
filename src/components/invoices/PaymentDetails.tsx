import { useState, useEffect } from "react";
import { CurrencySelect } from "./payment/CurrencySelect";
import { PaymentMethodSelect } from "./payment/PaymentMethodSelect";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, FileText, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentDetailsProps {
  selectedBankAccounts: string[];
  selectedGateway: string | null;
  onBankAccountAdd: (accountId: string) => void;
  onBankAccountRemove: (accountId: string) => void;
  onPaymentGatewayChange: (gatewayId: string) => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  invoice: {
    number: string;
    date: string;
    currency: string;
    customer: any;
    items: Array<{
      description: string;
      quantity: number;
      price: number;
      amount: number;
    }>;
    notes: string;
    terms: string;
  };
  onInvoiceChange: (invoice: any) => void;
}

export const PaymentDetails = ({ 
  selectedBankAccounts = [],
  selectedGateway,
  onBankAccountAdd,
  onBankAccountRemove,
  onPaymentGatewayChange,
  selectedCurrency,
  onCurrencyChange,
  invoice,
  onInvoiceChange
}: PaymentDetailsProps) => {
  const [bankAccounts, setBankAccounts] = useState([
    { id: '1', name: "First Bank Account" },
    { id: '2', name: "Second Bank Account" }
  ]);
  
  const [paymentGateways, setPaymentGateways] = useState([
    { id: 'stripe', name: "Stripe" },
    { id: 'paypal', name: "PayPal" }
  ]);

  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [isAttachmentsOpen, setIsAttachmentsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Payment Type</Label>
          <Select defaultValue="one-time">
            <SelectTrigger>
              <SelectValue placeholder="Select payment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time Payment</SelectItem>
              <SelectItem value="recurring">Recurring Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CurrencySelect 
          selectedCurrency={selectedCurrency} 
          onCurrencyChange={onCurrencyChange} 
        />
      </div>

      <PaymentMethodSelect 
        selectedBankAccounts={selectedBankAccounts}
        selectedGateway={selectedGateway}
        onBankAccountAdd={onBankAccountAdd}
        onBankAccountRemove={onBankAccountRemove}
        onPaymentGatewayChange={onPaymentGatewayChange}
        bankAccounts={bankAccounts}
        paymentGateways={paymentGateways}
      />

      <div className="space-y-4">
        <Collapsible open={isNotesOpen} onOpenChange={setIsNotesOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notes
              </span>
              {isNotesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <Textarea
              value={invoice.notes}
              onChange={(e) => onInvoiceChange({ ...invoice, notes: e.target.value })}
              placeholder="Add notes..."
            />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isTermsOpen} onOpenChange={setIsTermsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Terms & Conditions
              </span>
              {isTermsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <Textarea
              value={invoice.terms}
              onChange={(e) => onInvoiceChange({ ...invoice, terms: e.target.value })}
              placeholder="Add terms and conditions..."
            />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isFooterOpen} onOpenChange={setIsFooterOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Footer
              </span>
              {isFooterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <Textarea
              placeholder="Add footer text..."
              onChange={(e) => onInvoiceChange({ ...invoice, footer: e.target.value })}
            />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isAttachmentsOpen} onOpenChange={setIsAttachmentsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Attachments
              </span>
              {isAttachmentsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Attachment
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};