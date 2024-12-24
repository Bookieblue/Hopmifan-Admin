import { StatCard } from "@/components/dashboard/StatCard";
import {
  FileText,
  Calculator,
  Receipt,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";

export default function Index() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Invoices"
          value="$24,500"
          icon={<FileText className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending Estimates"
          value="8"
          icon={<Calculator className="w-6 h-6" />}
        />
        <StatCard
          title="Recent Receipts"
          value="15"
          icon={<Receipt className="w-6 h-6" />}
        />
        <StatCard
          title="Monthly Revenue"
          value="$8,250"
          icon={<TrendingUp className="w-6 h-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Upcoming Reminders"
          value="3"
          icon={<Clock className="w-6 h-6" />}
        />
        <StatCard
          title="Outstanding Balance"
          value="$3,450"
          icon={<DollarSign className="w-6 h-6" />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>
    </div>
  );
}