import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Filter, Search } from "lucide-react";

interface PaymentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate?: Date;
  setStartDate: (date: Date | undefined) => void;
  endDate?: Date;
  setEndDate: (date: Date | undefined) => void;
  handleResetFilter: () => void;
  handleApplyFilter: () => void;
  onOpenFilterModal: () => void;
}

export function PaymentFilters({
  searchQuery,
  setSearchQuery,
  onOpenFilterModal
}: PaymentFiltersProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onOpenFilterModal}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  );
}