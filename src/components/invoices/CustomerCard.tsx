import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

interface CustomerCardProps {
  customer: {
    name: string;
    email: string;
    street?: string;
    state?: string;
    postalCode?: string;
  };
  onEdit: () => void;
}

export const CustomerCard = ({ customer, onEdit }: CustomerCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{customer.name}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{customer.email}</p>
              {customer.street && (
                <p className="text-sm text-muted-foreground">
                  {customer.street}, {customer.state} {customer.postalCode}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <PenLine className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};