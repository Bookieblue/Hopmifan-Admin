import { useState } from "react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const data = {
  "1W": [
    { month: "Mon", amount: 1000000 },
    { month: "Tue", amount: 2000000 },
    { month: "Wed", amount: 2500000 },
    { month: "Thu", amount: 3000000 },
    { month: "Fri", amount: 3500000 },
    { month: "Sat", amount: 4000000 },
    { month: "Sun", amount: 4500000 },
  ],
  "1M": [
    { month: "Week 1", amount: 5000000 },
    { month: "Week 2", amount: 12000000 },
    { month: "Week 3", amount: 18000000 },
    { month: "Week 4", amount: 25000000 },
  ],
  "3M": [
    { month: "Jan", amount: 5000000 },
    { month: "Feb", amount: 12000000 },
    { month: "Mar", amount: 18000000 },
  ],
  "1Y": [
    { month: "Q1", amount: 15000000 },
    { month: "Q2", amount: 25000000 },
    { month: "Q3", amount: 35000000 },
    { month: "Q4", amount: 45000000 },
  ],
  "ALL": [
    { month: "2020", amount: 25000000 },
    { month: "2021", amount: 35000000 },
    { month: "2022", amount: 45000000 },
    { month: "2023", amount: 55000000 },
    { month: "2024", amount: 30345421 },
  ],
};

const recentActivities = [
  {
    type: "Payment Received",
    description: "Payment received for Invoice #INV-001",
    amount: 250000,
    date: "2024-03-15"
  },
  {
    type: "Invoice Sent",
    description: "New invoice #INV-002 sent to TechCorp",
    amount: 180000,
    date: "2024-03-14"
  },
  {
    type: "Estimate Accepted",
    description: "Estimate #EST-001 accepted by Client A",
    amount: 450000,
    date: "2024-03-13"
  },
  {
    type: "Payment Received",
    description: "Payment received for Invoice #INV-003",
    amount: 320000,
    date: "2024-03-12"
  }
];

export default function Index() {
  const [timeRange, setTimeRange] = useState("3M");

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Total Earnings</h2>
        <p className="text-muted-foreground">Your earnings over the last 6 months</p>
        <div className="text-4xl font-bold">₦30,345,421.00</div>
        
        <div className="flex flex-wrap gap-2 items-center">
          {Object.keys(data).map((range) => (
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

        <div className="h-[300px] w-full mt-8 bg-gradient-to-t from-[#0FA0CE]/10 to-transparent rounded-lg">
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
            <AreaChart data={data[timeRange]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0FA0CE" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0FA0CE" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
              />
              <ChartTooltip />
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

      <StatsGrid />

      <div className="grid grid-cols-1">
        <RecentActivity 
          activities={recentActivities}
          title="Recent Activities"
        />
      </div>
    </div>
  );
}