import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function Index() {
  return (
    <div className="space-y-8">
      <StatsGrid />
      <RecentActivity />
    </div>
  );
}