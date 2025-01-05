import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerSelect } from "./CustomerSelect";

interface InvoiceHeaderProps {
  invoiceId: string;
  dueDate: string;
  paymentType: "one-time" | "recurring";
  onInvoiceIdChange: (id: string) => void;
  onDueDateChange: (date: string) => void;
  onPaymentTypeChange: (type: "one-time" | "recurring") => void;
  onCustomerSelect: (customer: any) => void;
  initialCustomer?: any;
}

export const InvoiceHeader = ({ 
  invoiceId, 
  dueDate, 
  paymentType,
  onInvoiceIdChange,
  onDueDateChange, 
  onPaymentTypeChange,
  onCustomerSelect,
  initialCustomer
}: InvoiceHeaderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <CustomerSelect 
          onCustomerSelect={onCustomerSelect} 
          initialCustomer={initialCustomer}
        />
      </div>

      <div className="space-y-2">
        <Label>Invoice Number</Label>
        <Input 
          value={invoiceId} 
          onChange={(e) => onInvoiceIdChange(e.target.value)}
          placeholder="Enter invoice number"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Due Date</Label>
        <Input 
          type="date" 
          value={dueDate} 
          onChange={(e) => onDueDateChange(e.target.value)} 
        />
      </div>
    </div>
  );
};