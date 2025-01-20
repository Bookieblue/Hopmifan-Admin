import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  typeFilter?: string;
  setTypeFilter?: (value: string) => void;
  stateFilter?: string;
  setStateFilter?: (value: string) => void;
  dateFilter?: string;
  setDateFilter?: (value: string) => void;
  uniqueTypes?: string[];
  uniqueStates?: string[];
  // Add new date-related props
  startDate?: Date;
  setStartDate?: Dispatch<SetStateAction<Date>>;
  endDate?: Date;
  setEndDate?: Dispatch<SetStateAction<Date>>;
  onApply?: () => void;
  onReset?: () => void;
}

export function FilterModal({
  open,
  onOpenChange,
  typeFilter,
  setTypeFilter,
  stateFilter,
  setStateFilter,
  dateFilter,
  setDateFilter,
  uniqueTypes,
  uniqueStates,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApply,
  onReset
}: FilterModalProps) {
  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      if (setTypeFilter) setTypeFilter("all");
      if (setStateFilter) setStateFilter("all");
      if (setDateFilter) setDateFilter("");
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {typeFilter !== undefined && setTypeFilter && uniqueTypes && (
            <div className="space-y-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {stateFilter !== undefined && setStateFilter && uniqueStates && (
            <div className="space-y-2">
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {uniqueStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(startDate !== undefined && setStartDate) && (
            <div className="space-y-2">
              <Input
                type="date"
                value={startDate ? startDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                className="h-10"
                placeholder="Start Date"
              />
            </div>
          )}

          {(endDate !== undefined && setEndDate) && (
            <div className="space-y-2">
              <Input
                type="date"
                value={endDate ? endDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                className="h-10"
                placeholder="End Date"
              />
            </div>
          )}

          {dateFilter !== undefined && setDateFilter && (
            <div className="space-y-2">
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="h-10"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}