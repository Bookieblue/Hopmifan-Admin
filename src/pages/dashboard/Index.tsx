import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function Dashboard() {
  const activities = [
    {
      id: "1",
      type: "invoice",
      description: "New invoice created",
      date: new Date().toISOString(),
      amount: "₦1,500.00"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <StatsGrid />
      <RecentActivity activities={activities} />
    </div>
  );
}