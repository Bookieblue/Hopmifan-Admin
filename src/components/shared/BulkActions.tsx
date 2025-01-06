import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface BulkActionsProps {
  selectedCount: number;
  bulkAction: string;
  setBulkAction: (value: string) => void;
  onBulkAction: () => void;
  actions?: {
    value: string;
    label: string;
  }[];
}

export const BulkActions = ({
  selectedCount,
  bulkAction,
  setBulkAction,
  onBulkAction,
  actions = [
    { value: "delete", label: "Delete Selected" },
    { value: "export", label: "Export as CSV" },
  ],
}: BulkActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="p-4 border-t bg-gray-50 flex items-center gap-4">
      <Select value={bulkAction} onValueChange={setBulkAction}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select bulk action" />
        </SelectTrigger>
        <SelectContent>
          {actions.map((action) => (
            <SelectItem key={action.value} value={action.value}>
              {action.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        onClick={onBulkAction}
        disabled={!bulkAction || selectedCount === 0}
        className="ml-2"
      >
        Proceed
      </Button>
    </div>
  );
};