import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled";

interface InvoiceStatusSelectProps {
  status: InvoiceStatus;
  onStatusChange: (status: InvoiceStatus) => void;
  disabled?: boolean;
}

export const InvoiceStatusSelect = ({ 
  status, 
  onStatusChange,
  disabled = false 
}: InvoiceStatusSelectProps) => {
  const statuses: { value: InvoiceStatus; label: string; }[] = [
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "overdue", label: "Overdue" },
    { value: "cancelled", label: "Cancelled" }
  ];

  return (
    <Select 
      value={status} 
      onValueChange={(value) => onStatusChange(value as InvoiceStatus)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};