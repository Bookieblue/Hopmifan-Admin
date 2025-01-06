import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Overview = () => {
  const recentActivities = [
    {
      type: "New Invoice",
      description: "Invoice #001 created",
      amount: 50000,
      date: "2024-03-20"
    },
    {
      type: "Payment Received",
      description: "Payment for Invoice #002",
      amount: 75000,
      date: "2024-03-19"
    }
  ];

  return (
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-gray-500 mt-2">Welcome to your dashboard</p>
      </div>
      <StatsGrid />
      <RecentActivity 
        activities={recentActivities}
        title="Recent Activities"
      />
    </div>
  );
};

export default Overview;