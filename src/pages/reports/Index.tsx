import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/dashboard/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar } from "recharts";
import { TrendingUp, DollarSign, Percent, Users, FileText } from "lucide-react";

const revenueData = [
  { month: "Jan", amount: 15000 },
  { month: "Feb", amount: 25000 },
  { month: "Mar", amount: 32000 },
  { month: "Apr", amount: 38000 },
  { month: "May", amount: 42000 },
  { month: "Jun", amount: 45231.89 },
];

const documentData = [
  { month: "Jan", invoices: 25, estimates: 15, receipts: 20 },
  { month: "Feb", invoices: 32, estimates: 18, receipts: 28 },
  { month: "Mar", invoices: 28, estimates: 22, receipts: 25 },
  { month: "Apr", invoices: 35, estimates: 20, receipts: 30 },
  { month: "May", invoices: 40, estimates: 25, receipts: 35 },
  { month: "Jun", invoices: 38, estimates: 28, receipts: 32 },
];

const topCustomers = [
  {
    name: "Acme Corp",
    totalSpent: 45230.00,
    invoices: 12,
    lastInvoice: "2024-03-15",
    growth: "+15%"
  },
  {
    name: "TechStart Inc",
    totalSpent: 32150.00,
    invoices: 8,
    lastInvoice: "2024-03-10",
    growth: "+8%"
  },
  {
    name: "Global Industries",
    totalSpent: 28750.00,
    invoices: 6,
    lastInvoice: "2024-03-08",
    growth: "+12%"
  }
];

export default function Reports() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Business Reports</h1>
        <p className="text-muted-foreground mt-2">Track your business performance and growth</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 sm:grid-cols-3 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
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
              trend={{ value: 5.3, isPositive: true }}
            />
            <StatCard
              title="Collection Rate"
              value="85%"
              icon={<Percent className="h-4 w-4" />}
              trend={{ value: 2.1, isPositive: true }}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Revenue Trend</h2>
            <div className="rounded-lg border bg-card p-6">
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    primary: {
                      theme: {
                        light: "hsl(var(--primary))",
                        dark: "hsl(var(--primary))",
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
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Total Invoices"
              value="198"
              icon={<FileText className="h-4 w-4" />}
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard
              title="Total Estimates"
              value="126"
              icon={<FileText className="h-4 w-4" />}
              trend={{ value: 8.3, isPositive: true }}
            />
            <StatCard
              title="Total Receipts"
              value="170"
              icon={<FileText className="h-4 w-4" />}
              trend={{ value: 15.2, isPositive: true }}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Document Activity</h2>
            <div className="rounded-lg border bg-card p-6">
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    invoices: {
                      theme: {
                        light: "hsl(var(--primary))",
                        dark: "hsl(var(--primary))",
                      },
                    },
                    estimates: {
                      theme: {
                        light: "hsl(var(--secondary))",
                        dark: "hsl(var(--secondary))",
                      },
                    },
                    receipts: {
                      theme: {
                        light: "hsl(var(--accent))",
                        dark: "hsl(var(--accent))",
                      },
                    },
                  }}
                >
                  <BarChart data={documentData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="invoices" fill="hsl(var(--primary))" />
                    <Bar dataKey="estimates" fill="hsl(var(--secondary))" />
                    <Bar dataKey="receipts" fill="hsl(var(--accent))" />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Total Customers"
              value="45"
              icon={<Users className="h-4 w-4" />}
              trend={{ value: 25.5, isPositive: true }}
            />
            <StatCard
              title="Active Customers"
              value="38"
              icon={<Users className="h-4 w-4" />}
              trend={{ value: 15.2, isPositive: true }}
            />
            <StatCard
              title="Customer Growth"
              value="+12%"
              icon={<TrendingUp className="h-4 w-4" />}
              trend={{ value: 8.4, isPositive: true }}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Top Customers</h2>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Invoices</TableHead>
                    <TableHead>Last Invoice</TableHead>
                    <TableHead>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomers.map((customer) => (
                    <TableRow key={customer.name}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>₦{customer.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>{customer.invoices}</TableCell>
                      <TableCell>{customer.lastInvoice}</TableCell>
                      <TableCell className="text-green-600">{customer.growth}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}