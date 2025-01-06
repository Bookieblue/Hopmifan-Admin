import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Overview = () => {
  return (
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-gray-500 mt-2">Welcome to your dashboard</p>
      </div>
      <StatsGrid />
      <RecentActivity />
    </div>
  );
};

export default Overview;