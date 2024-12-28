import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ReceiptRowProps {
  receipt: {
    id: string;
    client: string;
    date: string;
    amount: string;
    status: string;
    type: string;
  };
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
}

export function ReceiptRow({ receipt, isSelected, onSelect }: ReceiptRowProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `Receipt ${receipt.id} is being downloaded.`,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Receipt deleted",
      description: `Receipt ${receipt.id} has been deleted.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <TableRow>
          <TableCell>
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(receipt.id, checked as boolean)}
              aria-label={`Select receipt ${receipt.id}`}
            />
          </TableCell>
          <TableCell>
            <div className="space-y-1">
              <div className="font-medium">{receipt.client}</div>
              <div className="text-sm text-muted-foreground">
                {receipt.type} • {format(new Date(receipt.date), "MMM d, yyyy")}
              </div>
            </div>
          </TableCell>
          <TableCell>{receipt.amount}</TableCell>
          <TableCell>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                receipt.status
              )}`}
            >
              {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <Link to={`/receipts/${receipt.id}`}>
          <ContextMenuItem>View Receipt</ContextMenuItem>
        </Link>
        <Link to={`/receipts/${receipt.id}/edit`}>
          <ContextMenuItem>Edit Receipt</ContextMenuItem>
        </Link>
        <ContextMenuItem onClick={handleDownload}>Download</ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-600">
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}