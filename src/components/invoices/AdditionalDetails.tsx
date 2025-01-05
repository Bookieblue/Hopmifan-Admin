import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Wallet, FileText } from "lucide-react";
import { useState } from "react";
import { PaymentMethodSelect } from "./payment/PaymentMethodSelect";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalDetailsProps {
  selectedBankAccounts: string[];
  selectedGateway: string | null;
  onBankAccountAdd: (accountId: string) => void;
  onBankAccountRemove: (accountId: string) => void;
  onPaymentGatewayChange: (gateway: string) => void;
  notes: string;
  terms: string;
  footer: string;
  onNotesChange: (notes: string) => void;
  onTermsChange: (terms: string) => void;
  onFooterChange: (footer: string) => void;
}

export const AdditionalDetails = ({
  selectedBankAccounts,
  selectedGateway,
  onBankAccountAdd,
  onBankAccountRemove,
  onPaymentGatewayChange,
  notes,
  terms,
  footer,
  onNotesChange,
  onTermsChange,
  onFooterChange,
}: AdditionalDetailsProps) => {
  const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isFooterOpen, setIsFooterOpen] = useState(false);

  const sections = [
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      description: 'Configure accepted payment methods and bank accounts for this invoice',
      icon: Wallet,
      isOpen: isPaymentMethodsOpen,
      setIsOpen: setIsPaymentMethodsOpen,
      content: (
        <PaymentMethodSelect
          selectedBankAccounts={selectedBankAccounts}
          selectedGateway={selectedGateway}
          onBankAccountAdd={onBankAccountAdd}
          onBankAccountRemove={onBankAccountRemove}
          onPaymentGatewayChange={onPaymentGatewayChange}
          bankAccounts={[
            { id: '1', name: "First Bank Account" },
            { id: '2', name: "Second Bank Account" }
          ]}
          paymentGateways={[
            { id: 'stripe', name: "Stripe" },
            { id: 'paypal', name: "PayPal" }
          ]}
        />
      )
    },
    {
      id: 'notes',
      title: 'Notes',
      description: 'Add any additional notes or information for your customer',
      icon: FileText,
      isOpen: isNotesOpen,
      setIsOpen: setIsNotesOpen,
      content: (
        <Textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add notes..."
          className="min-h-[100px]"
        />
      )
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      description: 'Specify the terms and conditions for this invoice',
      icon: FileText,
      isOpen: isTermsOpen,
      setIsOpen: setIsTermsOpen,
      content: (
        <Textarea
          value={terms}
          onChange={(e) => onTermsChange(e.target.value)}
          placeholder="Add terms and conditions..."
          className="min-h-[100px]"
        />
      )
    },
    {
      id: 'footer',
      title: 'Footer',
      description: 'Add a custom footer message to appear at the bottom of your invoice',
      icon: FileText,
      isOpen: isFooterOpen,
      setIsOpen: setIsFooterOpen,
      content: (
        <Textarea
          value={footer}
          onChange={(e) => onFooterChange(e.target.value)}
          placeholder="Add footer text..."
          className="min-h-[100px]"
        />
      )
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-xl font-semibold">Additional Details</h3>
      <div className="grid gap-6">
        {sections.map((section) => (
          <Card 
            key={section.id} 
            className="border rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md p-3"
          >
            <Collapsible open={section.isOpen} onOpenChange={section.setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full p-6 hover:bg-accent/50 transition-colors rounded-lg"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start text-left">
                      <span className="flex items-center gap-3 text-lg font-medium">
                        <section.icon className="w-5 h-5" />
                        {section.title}
                      </span>
                      <span className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </span>
                    </div>
                  </div>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-6 pt-2 border-t bg-accent/5 rounded-lg mt-2">
                  {section.content}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};
