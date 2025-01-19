import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  totalDonations: number;
  bookstoreSales: number;
  prayerRequests: number;
  membershipRequests: number;
}

interface Activity {
  type: "Publication" | "Event" | "Contact" | "Donation" | "Members Request" | "Sermon";
  description: string;
  amount?: number;
  date: string;
  status: "completed" | "pending" | "upcoming";
  reference: string;
}

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Listen for changes in localStorage
  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  const books = JSON.parse(localStorage.getItem('books') || '[]');
  const prayerRequests = JSON.parse(localStorage.getItem('prayerRequests') || '[]');
  const memberRequests = JSON.parse(localStorage.getItem('memberRequests') || '[]');

  return {
    totalDonations: donations.reduce((sum: number, d: any) => sum + (d.amount || 0), 0),
    bookstoreSales: books.reduce((sum: number, b: any) => sum + (b.sales || 0), 0),
    prayerRequests: prayerRequests.filter((pr: any) => pr.status === 'pending').length,
    membershipRequests: memberRequests.filter((mr: any) => mr.status === 'pending').length,
  };
};

const fetchRecentActivities = async (): Promise<Activity[]> => {
  // Fetch all activities from different sources
  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  const books = JSON.parse(localStorage.getItem('books') || '[]');
  const prayerRequests = JSON.parse(localStorage.getItem('prayerRequests') || '[]');
  const memberRequests = JSON.parse(localStorage.getItem('memberRequests') || '[]');
  const sermons = JSON.parse(localStorage.getItem('sermons') || '[]');

  const activities: Activity[] = [
    ...donations.map((d: any) => ({
      type: "Donation",
      description: `Donation received from ${d.donor}`,
      amount: d.amount,
      date: d.date,
      status: "completed",
      reference: d.reference
    })),
    ...books.map((b: any) => ({
      type: "Publication",
      description: `New book: ${b.title}`,
      amount: b.price,
      date: b.publishDate,
      status: b.status === 'published' ? 'completed' : 'pending',
      reference: b.id
    })),
    ...prayerRequests.map((pr: any) => ({
      type: "Contact",
      description: `Prayer request from ${pr.firstName} ${pr.lastName}`,
      date: pr.dateSubmitted,
      status: pr.status,
      reference: pr.id
    })),
    ...memberRequests.map((mr: any) => ({
      type: "Members Request",
      description: `Membership request from ${mr.firstName} ${mr.lastName}`,
      date: mr.dateSubmitted,
      status: mr.status,
      reference: mr.id
    })),
    ...sermons.map((s: any) => ({
      type: "Sermon",
      description: s.title,
      date: s.date,
      status: s.status === 'published' ? 'completed' : 'pending',
      reference: s.id
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   .slice(0, 10); // Get only the 10 most recent activities

  return activities;
};

export const useDashboardData = () => {
  const stats = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  const activities = useQuery({
    queryKey: ['recentActivities'],
    queryFn: fetchRecentActivities,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  return { stats, activities };
};