import { useState, useEffect } from "react";
import { CurrencySelect } from "./payment/CurrencySelect";
import { BankAccountSelect } from "./payment/BankAccountSelect";
import { PaymentGatewaySelect } from "./payment/PaymentGatewaySelect";

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

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <CurrencySelect 
          selectedCurrency={selectedCurrency} 
          onCurrencyChange={onCurrencyChange} 
        />

        <BankAccountSelect 
          selectedBankAccounts={selectedBankAccounts}
          onBankAccountAdd={onBankAccountAdd}
          onBankAccountRemove={onBankAccountRemove}
          bankAccounts={bankAccounts}
        />

        <PaymentGatewaySelect 
          selectedGateway={selectedGateway}
          onPaymentGatewayChange={onPaymentGatewayChange}
          paymentGateways={paymentGateways}
        />
      </div>
    </div>
  );
};