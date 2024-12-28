import { Card } from "@/components/ui/card";
import { TrendingUp, AlertCircle } from "lucide-react";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-6 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Payments Received</h3>
          <TrendingUp className="text-green-500 h-5 w-5" />
        </div>
        <p className="text-2xl font-bold">₦1,250,000.00</p>
        <p className="text-sm text-muted-foreground">15 payments this month</p>
      </Card>

      <Card className="p-6 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Unpaid Invoices</h3>
          <AlertCircle className="text-orange-500 h-5 w-5" />
        </div>
        <p className="text-2xl font-bold">₦450,000.00</p>
        <p className="text-sm text-muted-foreground">8 pending invoices</p>
      </Card>

      <Card className="p-6 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Overdue Invoices</h3>
          <AlertCircle className="text-red-500 h-5 w-5" />
        </div>
        <p className="text-2xl font-bold">₦180,000.00</p>
        <p className="text-sm text-muted-foreground">3 overdue invoices</p>
      </Card>
    </div>
  );
}