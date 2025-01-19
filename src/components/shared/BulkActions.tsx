import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface BulkAction {
  value: string;
  label: string;
}

interface BulkActionsProps {
  selectedCount: number;
  bulkAction: string;
  setBulkAction: (value: string) => void;
  onBulkAction: () => void;
  actions: BulkAction[];
}

export function BulkActions({
  selectedCount,
  bulkAction,
  setBulkAction,
  onBulkAction,
  actions,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 border-t">
      <p className="text-sm text-gray-600">
        {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
      </p>
      <Select value={bulkAction} onValueChange={setBulkAction}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Bulk actions" />
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
        variant="outline"
        onClick={onBulkAction}
        disabled={!bulkAction}
      >
        Apply
      </Button>
    </div>
  );
}