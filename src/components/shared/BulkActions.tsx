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
    <div className="sticky bottom-0 left-0 right-0 p-4 border-t bg-gray-50/80 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center gap-4">
      <div className="text-sm font-medium">
        {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
      </div>
      <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
        <Select value={bulkAction} onValueChange={setBulkAction}>
          <SelectTrigger className="w-full md:w-[200px]">
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
          className="whitespace-nowrap"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};