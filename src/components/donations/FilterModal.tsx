import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  startDate?: Date;
  setStartDate?: (date: Date) => void;
  endDate?: Date;
  setEndDate?: (date: Date) => void;
  onApply?: () => void;
  onReset?: () => void;
}

export function FilterModal({
  open,
  onOpenChange,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApply,
  onReset
}: FilterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Donations</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-10"
            />
          </div>
          
          {startDate !== undefined && endDate !== undefined && setStartDate && setEndDate && (
            <>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={startDate?.toISOString().split('T')[0] || ''}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={endDate?.toISOString().split('T')[0] || ''}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className="h-10"
                />
              </div>
            </>
          )}
          
          {onApply && onReset && (
            <div className="flex gap-2 justify-end">
              <button onClick={onReset} className="px-4 py-2 text-sm border rounded-md">
                Reset
              </button>
              <button onClick={onApply} className="px-4 py-2 text-sm bg-primary text-white rounded-md">
                Apply
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}