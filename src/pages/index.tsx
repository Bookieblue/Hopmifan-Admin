import { RecentActivity } from "@/components/dashboard/RecentActivity";
import type { Activity } from "@/components/dashboard/RecentActivity";

const Index = () => {
  const recentActivities: Activity[] = [
    {
      type: "Publication",
      description: "The Role of African Traditional Religion in Modern Christianity",
      amount: 0,
      date: "2024-03-15",
      status: "completed",
      reference: "ART-001"
    },
    {
      type: "Event",
      description: "Sunday Service",
      amount: 0,
      date: "2024-03-14",
      status: "pending",
      reference: "EVT-001"
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <RecentActivity activities={recentActivities} />
    </div>
  );
};

export default Index;