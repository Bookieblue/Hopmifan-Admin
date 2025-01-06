import { useState } from "react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { calculateTotalEarnings, groupPaymentsByTimeRange, formatChartData, type Payment } from "@/utils/paymentCalculations";

// Temporary mock data until connected to backend
const mockPayments: Payment[] = [
  { 
    date: "2024-03-14 10:00:00", 
    amount: 5057, 
    customer: "Client 1", 
    method: "Credit Card", 
    reference: "REF000001",
    type: "One-time"
  },
  { 
    date: "2024-03-13 15:30:00", 
    amount: 6470, 
    customer: "Client 2", 
    method: "Bank Transfer", 
    reference: "REF000002",
    type: "Recurring"
  },
  // ... Add more mock payments for testing
];

const timeRanges = ["24H", "1W", "1M", "3M", "1Y", "ALL"] as const;
type TimeRange = typeof timeRanges[number];

export default function Index() {
  const [timeRange, setTimeRange] = useState<TimeRange>("24H");
  
  // Calculate total earnings from all payments
  const totalEarnings = calculateTotalEarnings(mockPayments);
  
  // Group payments by selected time range
  const groupedPayments = groupPaymentsByTimeRange(mockPayments, timeRange);
  const chartData = formatChartData(groupedPayments);

  // Get recent activities from payments
  const recentActivities = mockPayments
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(payment => ({
      type: "Payment Received",
      description: `Payment received from ${payment.customer}`,
      amount: payment.amount,
      date: payment.date.split(' ')[0] // Get only the date part
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Total Earnings</h2>
        <p className="text-muted-foreground">Your earnings over time</p>
        <div className="text-4xl font-bold">
          ₦{totalEarnings.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
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

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
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
                <XAxis dataKey="month" />
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

          <div className="flex flex-col gap-4">
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