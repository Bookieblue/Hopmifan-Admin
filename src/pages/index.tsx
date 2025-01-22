import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Index() {
  const { activities } = useDashboardData();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your church management dashboard. Here's what's happening.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsGrid />
      </div>

      <div className="grid grid-cols-1">
        <RecentActivity 
          activities={activities || []}
          title="Recent Activities"
          className="p-4"
          titleClassName="text-lg"
        />
      </div>
    </div>
  );
}