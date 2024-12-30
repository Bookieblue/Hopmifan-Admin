import { Card } from "@/components/ui/card";
import { CircleDot } from "lucide-react";

export function StatsGrid() {
  return (
    <Card className="bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center gap-2">
            <CircleDot className="text-green-500 h-4 w-4" />
            <span className="text-lg">Payments Received</span>
          </div>
          <span className="text-lg font-semibold">₦4500.00</span>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center gap-2">
            <CircleDot className="text-orange-500 h-4 w-4" />
            <span className="text-lg">24 Waiting to be paid</span>
          </div>
          <span className="text-lg font-semibold">₦30500.00</span>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center gap-2">
            <CircleDot className="text-red-500 h-4 w-4" />
            <span className="text-lg">2 Overdue Invoices</span>
          </div>
          <span className="text-lg font-semibold">₦4500.00</span>
        </div>
      </div>
    </Card>
  );
}