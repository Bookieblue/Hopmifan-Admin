import { useState } from "react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { calculateTotalEarnings, groupPaymentsByTimeRange, formatChartData, type Payment } from "@/utils/paymentCalculations";

// Mock data moved to a separate constant
const mockPayments: Payment[] = [
  { 
    date: "2025-03-14 10:00:00", 
    amount: 505700, 
    customer: "Client A", 
    method: "Credit Card", 
    reference: "REF202503001",
    type: "One-time"
  },
  { 
    date: "2025-03-14 08:30:00", 
    amount: 647000, 
    customer: "Client B", 
    method: "Bank Transfer", 
    reference: "REF202503002",
    type: "Recurring"
  },
  { 
    date: "2025-03-14 06:15:00", 
    amount: 892500, 
    customer: "Client C", 
    method: "Credit Card", 
    reference: "REF202503003",
    type: "One-time"
  },
  { 
    date: "2025-03-13 23:45:00", 
    amount: 345000, 
    customer: "Client D", 
    method: "Bank Transfer", 
    reference: "REF202503004",
    type: "Recurring"
  },
];

const timeRanges = ["24H", "1W", "1M", "3M", "1Y", "ALL"] as const;
type TimeRange = (typeof timeRanges)[number];

export default function Index() {
  const [timeRange, setTimeRange] = useState<TimeRange>("24H");
  
  const totalEarnings = calculateTotalEarnings(mockPayments);
  const groupedPayments = groupPaymentsByTimeRange(mockPayments, timeRange);
  const chartData = formatChartData(groupedPayments);

  // Calculate the current selected period's total
  const selectedPeriodTotal = chartData.reduce((sum, data) => sum + data.amount, 0);

  const recentActivities = mockPayments
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(payment => ({
      type: payment.type === 'Recurring' ? 'Donation' : 'Publication' as const,
      description: `${payment.type === 'Recurring' ? 'Donation' : 'Publication'} from ${payment.customer}`,
      amount: payment.amount,
      date: payment.date.split(' ')[0],
      status: payment.type === 'Recurring' ? 'completed' as const : 'pending' as const,
      reference: payment.reference,
      member: payment.customer
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Total Earnings</h2>
        <p className="text-muted-foreground">Your earnings over time</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`text-sm font-medium ${
                    timeRange === range
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  } px-3 py-1 rounded-md transition-colors`}
                >
                  {range}
                </button>
              ))}
            </div>

            <div className="text-2xl font-bold">
              ₦{selectedPeriodTotal.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="h-[300px] w-full bg-gradient-to-t from-[#0FA0CE]/10 to-transparent rounded-lg">
              <ChartContainer
                className="h-full w-full"
                config={{
                  primary: {
                    theme: {
                      light: "#0FA0CE",
                      dark: "#0FA0CE",
                    },
                  },
                }}
              >
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0FA0CE" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0FA0CE" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month"
                    tickFormatter={(value) => value}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₦${(value / 1000).toFixed(1)}K`}
                  />
                  <ChartTooltip 
                    formatter={(value: number) => [`₦${value.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`, "Amount"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#0FA0CE"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 divide-y divide-border">
            <StatsGrid />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1">
        <RecentActivity 
          activities={recentActivities}
          title="Recent Activities"
        />
      </div>
    </div>
  );
}
