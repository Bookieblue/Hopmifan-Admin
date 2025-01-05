import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";

interface PaymentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  handleResetFilter: () => void;
  handleApplyFilter: () => void;
}

export function PaymentFilters({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleResetFilter,
  handleApplyFilter,
}: PaymentFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>(endDate);

  const handleApply = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    handleApplyFilter();
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempStartDate(undefined);
    setTempEndDate(undefined);
    handleResetFilter();
    setIsOpen(false);
  };

  return (
    <div className="mb-6 w-full">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search payments..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog 
          open={isOpen} 
          onOpenChange={setIsOpen}
        >
          <Button variant="outline" onClick={() => setIsOpen(true)} className="flex items-center gap-2 px-3 md:px-4 whitespace-nowrap">
            <CalendarDays className="h-4 w-4" />
            Filter
          </Button>
          <DialogContent className="bg-[#F9FAFB] p-5 sm:max-w-[425px]">
            <div className="bg-white rounded-lg p-5">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">Filter by Date Range</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From Date</label>
                  <DatePicker 
                    date={tempStartDate} 
                    setDate={setTempStartDate} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To Date</label>
                  <DatePicker 
                    date={tempEndDate} 
                    setDate={setTempEndDate} 
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={handleReset}>Reset Filter</Button>
                  <Button onClick={handleApply}>Apply Filter</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}