import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

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
        <RecentActivity title="Recent Activities" />
      </div>
    </div>
  );
}