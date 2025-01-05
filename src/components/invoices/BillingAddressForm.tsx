import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BillingAddressFormProps {
  newCustomer: {
    street: string;
    country: string;
    state: string;
    postalCode: string;
  };
  onChange: (field: string, value: string) => void;
}

export const BillingAddressForm = ({ newCustomer, onChange }: BillingAddressFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Street Address</Label>
        <Input 
          placeholder="Enter street address"
          value={newCustomer.street}
          onChange={(e) => onChange('street', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Country</Label>
        <Input 
          placeholder="Enter country"
          value={newCustomer.country}
          onChange={(e) => onChange('country', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>State</Label>
        <Input 
          placeholder="Enter state"
          value={newCustomer.state}
          onChange={(e) => onChange('state', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Postal Code</Label>
        <Input 
          placeholder="Enter postal code"
          value={newCustomer.postalCode}
          onChange={(e) => onChange('postalCode', e.target.value)}
        />
      </div>
    </div>
  );
};