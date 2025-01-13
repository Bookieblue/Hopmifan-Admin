import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

interface CustomerCardBaseProps {
  onDelete?: (id: string) => void;
  onEdit?: (customer: any) => void;
}

interface CustomerCardDirectProps extends CustomerCardBaseProps {
  customer: any;
}

interface CustomerCardTableProps extends CustomerCardBaseProps {
  item: any;
  actions?: {
    onDelete?: (id: string) => void;
    onEdit?: (customer: any) => void;
  };
}

type CustomerCardProps = CustomerCardDirectProps | CustomerCardTableProps;

export function CustomerCard(props: CustomerCardProps) {
  const customer = 'customer' in props ? props.customer : props.item;
  const actions = 'actions' in props ? props.actions : {
    onDelete: props.onDelete,
    onEdit: props.onEdit
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link to={`/customers/${customer.id}`}>
      <Card className="mb-4 p-4 hover:border-mint-200 transition-colors">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">{customer.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{customer.email}</span>
              <span>•</span>
              <span>{formatDate(customer.date)}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={(e) => {
                e.preventDefault();
                actions.onEdit?.(customer);
              }}>
                Edit
              </DropdownMenuItem>
              <Link to={`/customers/${customer.id}`}>
                <DropdownMenuItem>
                  View
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.preventDefault();
                  actions.onDelete?.(customer.id);
                }}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold">{customer.totalSpent}</span>
          <span className="text-sm text-muted-foreground">{customer.phone}</span>
        </div>
      </Card>
    </Link>
  );
}