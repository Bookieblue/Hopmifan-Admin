import { Card } from "@/components/ui/card";
import { CircleDot } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsGrid() {
  const { stats } = useDashboardData();

  if (stats.isLoading) {
    return (
      <>
        {Array(4).fill(0).map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </Card>
        ))}
      </>
    );
  }

  if (stats.error) {
    return (
      <Card className="p-4 col-span-4">
        <p className="text-red-500">Error loading dashboard data</p>
      </Card>
    );
  }

  const data = stats.data || {
    totalDonations: 0,
    bookstoreSales: 0,
    prayerRequests: 0,
    membershipRequests: 0
  };

  return (
    <>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-green-500 h-4 w-4" />
              <span className="text-base font-medium">Total Donations</span>
            </div>
            <span className="text-2xl font-bold block">
              ₦{data.totalDonations.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-orange-500 h-4 w-4" />
              <span className="text-base font-medium">Bookstore Sales</span>
            </div>
            <span className="text-2xl font-bold block">
              ₦{data.bookstoreSales.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-blue-500 h-4 w-4" />
              <span className="text-base font-medium">Prayer Requests</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{data.prayerRequests}</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">New request pending</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-purple-500 h-4 w-4" />
              <span className="text-base font-medium">Membership</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{data.membershipRequests}</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">New request pending</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}