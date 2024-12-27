import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/dashboard/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import { TrendingUp, DollarSign, Percent } from "lucide-react";

const revenueData = [
  { month: "Jan", amount: 15000 },
  { month: "Feb", amount: 25000 },
  { month: "Mar", amount: 32000 },
  { month: "Apr", amount: 38000 },
  { month: "May", amount: 42000 },
  { month: "Jun", amount: 45231.89 },
];

const topCustomers = [
  {
    name: "Acme Corp",
    totalSpent: 45230.00,
    invoices: 12,
    lastInvoice: "2024-03-15"
  },
  {
    name: "TechStart Inc",
    totalSpent: 32150.00,
    invoices: 8,
    lastInvoice: "2024-03-10"
  },
  {
    name: "Global Industries",
    totalSpent: 28750.00,
    invoices: 6,
    lastInvoice: "2024-03-08"
  }
];

export default function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Total Revenue"
              value="₦45,231.89"
              icon={<TrendingUp className="h-4 w-4" />}
              trend={{ value: 20.1, isPositive: true }}
            />
            <StatCard
              title="Average Invoice"
              value="₦3,890.00"
              icon={<DollarSign className="h-4 w-4" />}
              className="text-sm text-muted-foreground"
            />
            <StatCard
              title="Collection Rate"
              value="85%"
              icon={<Percent className="h-4 w-4" />}
              trend={{ value: 5, isPositive: false }}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Revenue Trend</h2>
            <div className="h-[300px]">
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
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`}
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

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Top Customers</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Invoices</TableHead>
                  <TableHead>Last Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer) => (
                  <TableRow key={customer.name}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>₦{customer.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>{customer.invoices}</TableCell>
                    <TableCell>{customer.lastInvoice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="invoices">
          <div className="text-center py-8 text-muted-foreground">
            Invoice reports coming soon
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="text-center py-8 text-muted-foreground">
            Customer reports coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}