import { Card } from "@/components/ui/card";
import { CircleDot } from "lucide-react";

export function StatsGrid() {
  return (
    <div className="bg-gradient-to-br from-[#0FA0CE]/10 to-transparent rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleDot className="text-green-500 h-4 w-4" />
          <span className="text-lg">Payments Received</span>
        </div>
        <span className="text-lg font-semibold">₦4500.00</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleDot className="text-orange-500 h-4 w-4" />
          <span className="text-lg">24 Waiting to be paid</span>
        </div>
        <span className="text-lg font-semibold">₦30500.00</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleDot className="text-red-500 h-4 w-4" />
          <span className="text-lg">2 Overdue Invoices</span>
        </div>
        <span className="text-lg font-semibold">₦4500.00</span>
      </div>
    </div>
  );
}