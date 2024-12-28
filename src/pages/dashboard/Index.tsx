import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const recentActivities = [
  {
    id: 1,
    type: "invoice_created",
    description: "New invoice created for Client A",
    timestamp: "2024-03-20T10:00:00Z"
  },
  {
    id: 2,
    type: "payment_received",
    description: "Payment received from Client B",
    timestamp: "2024-03-19T15:30:00Z"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
      </div>
      <StatsGrid />
      <RecentActivity 
        activities={recentActivities}
        title="Recent Activity"
      />
    </div>
  );
}