import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BillingAddressFormProps {
  newCustomer: {
    billingAddress: string;
  };
  onChange: (field: string, value: string) => void;
}

export const BillingAddressForm = ({ newCustomer, onChange }: BillingAddressFormProps) => {
  return (
    <div className="space-y-2">
      <Label>Billing Address</Label>
      <Textarea 
        placeholder="Enter complete billing address"
        className="min-h-[100px]"
        value={newCustomer.billingAddress}
        onChange={(e) => onChange('billingAddress', e.target.value)}
      />
    </div>
  );
};