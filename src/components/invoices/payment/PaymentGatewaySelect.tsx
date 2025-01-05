import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, X } from "lucide-react";

interface PaymentGatewaySelectProps {
  selectedGateway: string | null;
  onPaymentGatewayChange: (gatewayId: string) => void;
  paymentGateways: Array<{ id: string; name: string; }>;
}

export const PaymentGatewaySelect = ({ 
  selectedGateway, 
  onPaymentGatewayChange,
  paymentGateways 
}: PaymentGatewaySelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Payment Gateway</Label>
      <Select onValueChange={onPaymentGatewayChange} value={selectedGateway || undefined}>
        <SelectTrigger>
          <SelectValue placeholder="Select payment gateway" />
        </SelectTrigger>
        <SelectContent>
          {paymentGateways?.map((gateway) => (
            <SelectItem key={gateway.id} value={gateway.id}>
              {gateway.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedGateway && (
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <CreditCard className="w-3 h-3" />
            {paymentGateways?.find((g) => g.id === selectedGateway)?.name}
            <button
              type="button"
              onClick={() => onPaymentGatewayChange('')}
              className="ml-1 hover:text-destructive"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        </div>
      )}
    </div>
  );
};