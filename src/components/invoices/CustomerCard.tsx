import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

interface Customer {
  name: string;
  email: string;
  street?: string;
  state?: string;
  postalCode?: string;
}

interface CustomerCardProps {
  customer?: Customer;
  item?: Customer;
  onEdit?: () => void;
  actions?: {
    onDelete?: (id: string) => void;
  };
}

export const CustomerCard = ({ customer, item, onEdit, actions }: CustomerCardProps) => {
  // Use either direct customer prop or item prop from DataTable
  const customerData = customer || item;

  if (!customerData) {
    return null;
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{customerData.name}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{customerData.email}</p>
              {customerData.street && (
                <p className="text-sm text-muted-foreground">
                  {customerData.street}, {customerData.state} {customerData.postalCode}
                </p>
              )}
            </div>
          </div>
          {(onEdit || actions) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="h-8 w-8 p-0 hover:bg-accent"
            >
              <PenLine className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};