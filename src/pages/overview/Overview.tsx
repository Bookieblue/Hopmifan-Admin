import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatsGrid } from "@/components/dashboard/StatsGrid";

const Overview = () => {
  // Sample activities data
  const recentActivities = [
    {
      id: 1,
      type: "invoice",
      description: "Invoice #001 created",
      date: new Date().toISOString(),
      amount: 1500,
      status: "pending"
    },
    {
      id: 2,
      type: "estimate",
      description: "Estimate #002 sent",
      date: new Date().toISOString(),
      amount: 2500,
      status: "sent"
    }
  ];

  return (
    <div className="space-y-8">
      <StatsGrid />
      <RecentActivity 
        title="Recent Activity"
        activities={recentActivities}
      />
    </div>
  );
};

export default Overview;