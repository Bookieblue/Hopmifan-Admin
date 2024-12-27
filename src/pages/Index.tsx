import { Card } from "@/components/ui/card";
import { TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", amount: 5000000 },
  { month: "Feb", amount: 12000000 },
  { month: "Mar", amount: 18000000 },
  { month: "Apr", amount: 25000000 },
  { month: "May", amount: 28000000 },
  { month: "Jun", amount: 30345421 },
];

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
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Total Earnings</h2>
        <p className="text-muted-foreground">Your earnings over the last 6 months</p>
        <div className="text-4xl font-bold">₦30,345,421.00</div>
        
        <div className="flex gap-4 items-center">
          <button className="text-sm font-medium hover:bg-accent px-3 py-1 rounded-md">1W</button>
          <button className="text-sm font-medium hover:bg-accent px-3 py-1 rounded-md">1M</button>
          <button className="text-sm font-medium bg-accent px-3 py-1 rounded-md">3M</button>
          <button className="text-sm font-medium hover:bg-accent px-3 py-1 rounded-md">1Y</button>
          <button className="text-sm font-medium hover:bg-accent px-3 py-1 rounded-md">ALL</button>
        </div>

        <div className="h-[300px] mt-8">
          <ChartContainer
            className="h-full"
            config={{
              primary: {
                theme: {
                  light: "var(--primary)",
                  dark: "var(--primary)",
                },
              },
            }}
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
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
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorAmount)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium">{activity.type}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₦{activity.amount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}