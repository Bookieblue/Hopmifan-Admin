import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenLine, User } from "lucide-react";

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
    <Card className="hover:shadow-sm transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
            {customerData.profilePicture ? (
              <img 
                src={customerData.profilePicture} 
                alt={customerData.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-medium text-base">{customerData.name}</h3>
            <div className="text-sm text-muted-foreground space-y-0.5">
              <p>{customerData.email}</p>
              {customerData.street && (
                <p className="text-sm text-muted-foreground">
                  {customerData.street}, {customerData.state} {customerData.postalCode}
                </p>
              )}
              {(onEdit || actions) && (
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm flex items-center gap-1.5 text-muted-foreground hover:text-primary mt-1"
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