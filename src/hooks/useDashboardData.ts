import { useQuery } from "@tanstack/react-query";
import { Activity } from "@/types/activity";

interface DashboardStats {
  contactMessages: number;
  prayerRequests: number;
  membershipRequests: number;
  newPayments: number;
  newEvents: number;
  eventRegistrations: number;
  totalDonations: number;
  totalMembers: number;
  totalEvents: number;
  totalArticles: number;
  bookstoreSales: number;
}

export function useDashboardData() {
  const stats = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Simulated API call
      const mockStats: DashboardStats = {
        contactMessages: 3,
        prayerRequests: 2,
        membershipRequests: 5,
        newPayments: 8,
        newEvents: 4,
        eventRegistrations: 6,
        totalDonations: 25000,
        totalMembers: 150,
        totalEvents: 12,
        totalArticles: 45,
        bookstoreSales: 15000
      };
      
      return mockStats;
    },
  });

  const activities: Activity[] = [
    {
      type: "Donation",
      description: "New donation received from John Doe",
      amount: 1000,
      date: "2024-01-20T10:30:00Z",
      status: "completed",
      reference: "DON-001",
      member: "John Doe"
    },
    {
      type: "Members Request",
      description: "Sarah Smith requested membership",
      date: "2024-01-20T09:15:00Z",
      status: "pending",
      reference: "MEM-001",
      member: "Sarah Smith"
    },
    {
      type: "Event",
      description: "Youth Group Meeting scheduled",
      date: "2024-01-20T08:45:00Z",
      status: "upcoming",
      reference: "EVT-001",
      member: "Admin"
    },
    {
      type: "Publication",
      description: "New blog post published: Sunday Service Highlights",
      date: "2024-01-20T07:30:00Z",
      status: "completed",
      reference: "PUB-001",
      member: "Admin"
    }
  ];

  return {
    stats,
    activities,
  };
}