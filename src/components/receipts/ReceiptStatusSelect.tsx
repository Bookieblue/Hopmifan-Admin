import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type ReceiptStatus = "draft" | "pending" | "paid" | "cancelled";

interface ReceiptStatusSelectProps {
  status: ReceiptStatus;
  onStatusChange: (status: ReceiptStatus) => void;
  disabled?: boolean;
}

export const ReceiptStatusSelect = ({ 
  status, 
  onStatusChange,
  disabled = false 
}: ReceiptStatusSelectProps) => {
  const statuses: { value: ReceiptStatus; label: string; bgColor: string; textColor: string }[] = [
    { value: "pending", label: "Pending", bgColor: "bg-orange-100", textColor: "text-orange-800" },
    { value: "paid", label: "Marked as Paid", bgColor: "bg-green-100", textColor: "text-green-800" },
    { value: "cancelled", label: "Cancelled", bgColor: "bg-purple-100", textColor: "text-purple-800" }
  ];

  const selectedStatus = statuses.find(s => s.value === status);

  return (
    <Select 
      value={status} 
      onValueChange={(value) => onStatusChange(value as ReceiptStatus)}
      disabled={disabled}
    >
      <SelectTrigger className={cn(
        "w-[180px]",
        selectedStatus?.bgColor,
        selectedStatus?.textColor,
        "border-0 font-medium"
      )}>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem 
            key={status.value} 
            value={status.value}
            className={cn(
              "font-medium",
              status.bgColor,
              status.textColor
            )}
          >
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};