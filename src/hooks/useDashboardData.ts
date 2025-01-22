import { useQuery } from "@tanstack/react-query";

// Initialize sample data if not present
const initializeSampleData = () => {
  if (!localStorage.getItem('donations')) {
    localStorage.setItem('donations', JSON.stringify([
      { amount: 50000, donor: "John Doe", date: new Date().toISOString(), status: "completed" },
      { amount: 25000, donor: "Jane Smith", date: new Date().toISOString(), status: "completed" }
    ]));
  }

  if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify([
      { title: "The Purpose Driven Life", price: 15000, sales: 5, status: "published" },
      { title: "Daily Devotional", price: 10000, sales: 3, status: "published" }
    ]));
  }

  if (!localStorage.getItem('prayerRequests')) {
    localStorage.setItem('prayerRequests', JSON.stringify([
      { firstName: "Alice", lastName: "Johnson", request: "Health and healing", status: "pending", dateSubmitted: new Date().toISOString() },
      { firstName: "Bob", lastName: "Wilson", request: "Family unity", status: "pending", dateSubmitted: new Date().toISOString() }
    ]));
  }

  if (!localStorage.getItem('memberRequests')) {
    localStorage.setItem('memberRequests', JSON.stringify([
      { firstName: "Carol", lastName: "Brown", status: "pending", dateSubmitted: new Date().toISOString() },
      { firstName: "David", lastName: "Miller", status: "pending", dateSubmitted: new Date().toISOString() }
    ]));
  }

  if (!localStorage.getItem('eventRegistrations')) {
    localStorage.setItem('eventRegistrations', JSON.stringify([
      { eventName: "Sunday Service", attendee: "Mark Wilson", date: new Date().toISOString(), status: "confirmed" },
      { eventName: "Youth Conference", attendee: "Sarah Jones", date: new Date().toISOString(), status: "pending" }
    ]));
  }
};

const fetchDashboardStats = async () => {
  // Initialize sample data
  initializeSampleData();

  // Fetch data from localStorage
  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  const books = JSON.parse(localStorage.getItem('books') || '[]');
  const prayerRequests = JSON.parse(localStorage.getItem('prayerRequests') || '[]');
  const memberRequests = JSON.parse(localStorage.getItem('memberRequests') || '[]');

  return {
    totalDonations: donations.reduce((sum: number, d: any) => sum + (d.amount || 0), 0),
    bookstoreSales: books.reduce((sum: number, b: any) => sum + ((b.price || 0) * (b.sales || 0)), 0),
    prayerRequests: prayerRequests.filter((pr: any) => pr.status === 'pending').length,
    membershipRequests: memberRequests.filter((mr: any) => mr.status === 'pending').length,
  };
};

const fetchRecentActivities = async () => {
  // Initialize sample data
  initializeSampleData();

  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  const books = JSON.parse(localStorage.getItem('books') || '[]');
  const prayerRequests = JSON.parse(localStorage.getItem('prayerRequests') || '[]');
  const memberRequests = JSON.parse(localStorage.getItem('memberRequests') || '[]');
  const eventRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');

  const activities = [
    ...donations.map((d: any) => ({
      type: "Donation" as const,
      description: `Donation: ₦${d.amount.toLocaleString()} - ${d.donor}`,
      amount: d.amount,
      date: d.date,
      status: "completed" as const,
      reference: crypto.randomUUID()
    })),
    ...books.filter((b: any) => b.sales > 0).map((b: any) => ({
      type: "Publication" as const,
      description: `Book Sale: ₦${(b.price * b.sales).toLocaleString()} - ${b.title} (${b.sales} copies)`,
      amount: b.price * b.sales,
      date: new Date().toISOString(),
      status: "completed" as const,
      reference: crypto.randomUUID()
    })),
    ...prayerRequests.map((pr: any) => ({
      type: "Contact" as const,
      description: `Prayer request from ${pr.firstName} ${pr.lastName}: ${pr.request}`,
      date: pr.dateSubmitted,
      status: pr.status as "completed" | "pending" | "upcoming",
      reference: crypto.randomUUID()
    })),
    ...memberRequests.map((mr: any) => ({
      type: "Members Request" as const,
      description: `Membership request from ${mr.firstName} ${mr.lastName}`,
      date: mr.dateSubmitted,
      status: mr.status as "completed" | "pending" | "upcoming",
      reference: crypto.randomUUID()
    })),
    ...eventRegistrations.map((er: any) => ({
      type: "Event" as const,
      description: `Event Registration: ${er.eventName} - ${er.attendee}`,
      date: er.date,
      status: er.status as "completed" | "pending" | "upcoming",
      reference: crypto.randomUUID()
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return activities.slice(0, 8); // Return only the 8 most recent activities
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