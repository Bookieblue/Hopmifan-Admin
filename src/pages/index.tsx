import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card } from "@/components/ui/card";
import { Activity } from "@/components/dashboard/RecentActivity";

// Mock data for recent activities
const recentActivities: Activity[] = [
  {
    type: "Contact",
    description: "New prayer request from John Doe",
    date: "2024-03-20",
    status: "pending",
    reference: "PR001"
  },
  {
    type: "Donation",
    description: "Donation received for building project",
    amount: 50000,
    date: "2024-03-19",
    status: "completed",
    reference: "DON001"
  },
  {
    type: "Sermon",
    description: "New sermon uploaded: 'Walking in Faith'",
    date: "2024-03-18",
    status: "completed",
    reference: "SER001"
  },
  {
    type: "Event",
    description: "Youth Conference registration opened",
    date: "2024-03-17",
    status: "upcoming",
    reference: "EVT001"
  },
  {
    type: "Members Request",
    description: "New contact message regarding membership",
    date: "2024-03-16",
    status: "pending",
    reference: "CON001"
  }
];

export default function Index() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your church management dashboard. Here's what's happening.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsGrid />
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