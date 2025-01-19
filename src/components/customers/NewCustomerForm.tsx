import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NewCustomer } from "@/types/customer";

interface NewCustomerFormProps {
  newCustomer: NewCustomer;
  includeBillingAddress: boolean;
  onFieldChange: (field: string, value: string) => void;
  onBillingAddressToggle: (checked: boolean) => void;
  onSubmit: () => void;
}

export const NewCustomerForm = ({
  newCustomer,
  includeBillingAddress,
  onFieldChange,
  onBillingAddressToggle,
  onSubmit
}: NewCustomerFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input 
          placeholder="Enter customer name"
          value={newCustomer.name || ""}
          onChange={(e) => onFieldChange('name', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input 
          type="email" 
          placeholder="Enter customer email"
          value={newCustomer.email || ""}
          onChange={(e) => onFieldChange('email', e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="billing-address"
          checked={includeBillingAddress}
          onCheckedChange={onBillingAddressToggle}
        />
        <Label htmlFor="billing-address">Include Billing Address</Label>
      </div>
      {includeBillingAddress && (
        <div className="space-y-2">
          <Label>Billing Address</Label>
          <Textarea
            placeholder="Enter complete billing address"
            value={typeof newCustomer.billingAddress === 'string' ? newCustomer.billingAddress : ''}
            onChange={(e) => onFieldChange('billingAddress', e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      )}
      <Button className="w-full" onClick={onSubmit}>
        Add Customer
      </Button>
    </div>
  );
};