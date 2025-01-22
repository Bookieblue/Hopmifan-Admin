import { useQuery } from "@tanstack/react-query";

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
}

interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  status?: string;
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
        totalArticles: 45
      };
      
      return mockStats;
    },
  });

  const activities = [
    {
      id: '1',
      type: 'payment',
      message: 'New donation received from John Doe',
      timestamp: '2024-01-20T10:30:00Z',
      status: 'success'
    },
    {
      id: '2',
      type: 'member',
      message: 'Sarah Smith requested membership',
      timestamp: '2024-01-20T09:15:00Z'
    },
    {
      id: '3',
      type: 'event',
      message: 'Youth Group Meeting scheduled',
      timestamp: '2024-01-20T08:45:00Z'
    },
    {
      id: '4',
      type: 'article',
      message: 'New blog post published: "Sunday Service Highlights"',
      timestamp: '2024-01-20T07:30:00Z'
    }
  ];

  return {
    stats,
    activities,
  };
}