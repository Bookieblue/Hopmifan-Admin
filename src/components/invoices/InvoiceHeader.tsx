import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateInvoiceId } from "@/lib/utils";

interface InvoiceHeaderProps {
  invoiceId: string;
  dueDate: string;
  paymentType: "one-time" | "recurring";
  onInvoiceIdChange: (id: string) => void;
  onDueDateChange: (date: string) => void;
  onPaymentTypeChange: (type: "one-time" | "recurring") => void;
}

export const InvoiceHeader = ({ 
  invoiceId, 
  dueDate, 
  paymentType,
  onInvoiceIdChange,
  onDueDateChange, 
  onPaymentTypeChange 
}: InvoiceHeaderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="space-y-3">
        <Label>Payment Type</Label>
        <RadioGroup 
          value={paymentType} 
          onValueChange={(value: "one-time" | "recurring") => onPaymentTypeChange(value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-time" id="one-time" />
            <Label htmlFor="one-time">One-time Payment</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="recurring" id="recurring" />
            <Label htmlFor="recurring">Recurring Payment</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};