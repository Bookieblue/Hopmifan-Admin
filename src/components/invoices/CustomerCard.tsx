import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

interface Customer {
  name: string;
  email: string;
  street?: string;
  state?: string;
  postalCode?: string;
  profilePicture?: string;
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
  const customerData = customer || item;

  if (!customerData) {
    return null;
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={customerData.profilePicture || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"} 
              alt={customerData.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg">{customerData.name}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{customerData.email}</p>
              {customerData.street && (
                <p className="text-sm text-muted-foreground">
                  {customerData.street}, {customerData.state} {customerData.postalCode}
                </p>
              )}
              {(onEdit || actions) && (
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm flex items-center gap-2 text-muted-foreground hover:text-primary"
                  onClick={onEdit}
                >
                  <PenLine className="h-3 w-3" />
                  Change Client
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};