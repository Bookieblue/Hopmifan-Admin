import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EstimateCardProps {
  item: any;
  actions?: {
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
    onShare?: (id: string) => void;
  };
}

export function EstimateCard({ item, actions }: EstimateCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link to={`/estimates/${item.id}/edit`}>
      <Card className="mb-4 p-4 hover:border-primary/20 transition-colors">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">EST-{item.id}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDate(item.date)}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={(e) => {
                e.preventDefault();
                actions?.onDuplicate?.(item.id);
              }}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => {
                e.preventDefault();
                actions?.onShare?.(item.id);
              }}>
                Share
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.preventDefault();
                  actions?.onDelete?.(item.id);
                }}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-lg font-semibold">{item.amount}</span>
          <Badge 
            variant="secondary"
            className={`
              ${item.status === 'accepted' ? 'bg-green-50 text-green-700' : ''}
              ${item.status === 'pending' ? 'bg-orange-50 text-orange-700' : ''}
              ${item.status === 'rejected' ? 'bg-red-50 text-red-700' : ''}
            `}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        </div>
      </Card>
    </Link>
  );
}