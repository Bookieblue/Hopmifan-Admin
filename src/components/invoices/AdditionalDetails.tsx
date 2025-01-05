import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Wallet, FileText } from "lucide-react";
import { useState } from "react";
import { PaymentMethodSelect } from "./payment/PaymentMethodSelect";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
      <div className="divide-y divide-border">
        {sections.map((section) => (
          <div key={section.id} className="transition-all duration-200">
            <Collapsible open={section.isOpen} onOpenChange={section.setIsOpen}>
              <div className="flex items-center justify-between w-full py-3">
                <div className="flex items-center gap-3">
                  <section.icon className="w-5 h-5" />
                  <h4 className="text-lg font-medium">{section.title}</h4>
                </div>
                <Switch
                  checked={section.isOpen}
                  onCheckedChange={section.setIsOpen}
                  className="ml-4"
                />
              </div>
              <CollapsibleContent>
                <div className="pb-4">
                  {section.content}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
};