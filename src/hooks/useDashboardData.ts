import { useState, useEffect } from "react";
import { Activity } from "@/components/dashboard/RecentActivity";

interface DashboardStats {
  totalMembers: number;
  totalDonations: number;
  totalEvents: number;
  totalBooks: number;
  membershipRequests: number;
  prayerRequests: number;
  contactMessages: number;
  newPayments: number;
  bookstoreSales: number;
}

interface DashboardData {
  stats: {
    data: DashboardStats | null;
    loading: boolean;
    error?: Error | null;
  };
  activities: Activity[];
}

// Helper function to ensure valid date
const getValidDate = () => {
  return new Date().toISOString();
};

if (!localStorage.getItem('eventRegistrations')) {
  localStorage.setItem('eventRegistrations', JSON.stringify([
    { eventName: "Sunday Service", attendee: "Mark Johnson", date: getValidDate(), status: "confirmed" }
  ]));
}

if (!localStorage.getItem('prayerRequests')) {
  localStorage.setItem('prayerRequests', JSON.stringify([
    { firstName: "John", lastName: "Doe", request: "Healing for my mother", dateSubmitted: getValidDate(), status: "pending" }
  ]));
}

if (!localStorage.getItem('contactMessages')) {
  localStorage.setItem('contactMessages', JSON.stringify([
    { firstName: "Jane", lastName: "Smith", message: "Interested in joining the choir", dateSubmitted: getValidDate(), status: "pending" }
  ]));
}

if (!localStorage.getItem('books')) {
  localStorage.setItem('books', JSON.stringify([
    { title: "Walking with God", price: 20, sales: 5, date: getValidDate() }
  ]));
}

if (!localStorage.getItem('donations')) {
  localStorage.setItem('donations', JSON.stringify([
    { donor: "Michael Brown", amount: 100, date: getValidDate(), status: "completed" }
  ]));
}

if (!localStorage.getItem('membershipRequests')) {
  localStorage.setItem('membershipRequests', JSON.stringify([
    { firstName: "Sarah", lastName: "Johnson", dateSubmitted: getValidDate(), status: "pending" }
  ]));
}

if (!localStorage.getItem('payments')) {
  localStorage.setItem('payments', JSON.stringify([
    { id: "1", amount: 500, date: getValidDate(), status: "pending", viewed: false }
  ]));
}

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardData["stats"]>({
    data: null,
    loading: true,
    error: null
  });

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      try {
        const eventRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
        const prayerRequests = JSON.parse(localStorage.getItem('prayerRequests') || '[]');
        const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const books = JSON.parse(localStorage.getItem('books') || '[]');
        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        const membershipRequests = JSON.parse(localStorage.getItem('membershipRequests') || '[]');
        const payments = JSON.parse(localStorage.getItem('payments') || '[]');

        // Calculate totals
        const totalBookSales = books.reduce((acc: number, book: any) => acc + (book.price * book.sales), 0);
        const totalDonationsAmount = donations.reduce((acc: number, donation: any) => acc + donation.amount, 0);

        // Calculate unviewed/pending counts
        const pendingPrayerRequests = prayerRequests.filter((pr: any) => pr.status === "pending").length;
        const pendingContactMessages = contactMessages.filter((cm: any) => cm.status === "pending").length;
        const pendingMembershipRequests = membershipRequests.filter((mr: any) => mr.status === "pending").length;
        const unviewedPayments = payments.filter((p: any) => !p.viewed).length;

        setStats({
          data: {
            totalMembers: 150,
            totalDonations: totalDonationsAmount,
            totalEvents: eventRegistrations.length,
            totalBooks: books.length,
            membershipRequests: pendingMembershipRequests,
            prayerRequests: pendingPrayerRequests,
            contactMessages: pendingContactMessages,
            newPayments: unviewedPayments,
            bookstoreSales: totalBookSales
          },
          loading: false,
          error: null
        });

        // Create activities array with validated dates
        const newActivities: Activity[] = [
          ...prayerRequests.slice(0, 1).map((pr: any) => ({
            type: "Prayer Request" as const,
            description: `Prayer request from ${pr.firstName} ${pr.lastName}: ${pr.request}`,
            date: new Date(pr.dateSubmitted).toISOString(),
            status: pr.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID()
          })),
          ...eventRegistrations.slice(0, 1).map((er: any) => ({
            type: "Event Registration" as const,
            description: `${er.attendee} registered for ${er.eventName}`,
            date: new Date(er.date).toISOString(),
            status: er.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID()
          })),
          ...contactMessages.slice(0, 1).map((cm: any) => ({
            type: "Contact" as const,
            description: `Contact message from ${cm.firstName} ${cm.lastName}`,
            date: new Date(cm.dateSubmitted).toISOString(),
            status: cm.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID()
          })),
          ...donations.slice(0, 1).map((d: any) => ({
            type: "Donation" as const,
            description: `New donation from ${d.donor}`,
            amount: d.amount,
            date: new Date(d.date).toISOString(),
            status: d.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID()
          })),
          ...books.filter((b: any) => b.sales > 0).slice(0, 1).map((b: any) => ({
            type: "Book Sale" as const,
            description: `New book sale "${b.title}"`,
            amount: b.price * b.sales,
            date: new Date(b.date).toISOString(),
            status: "completed" as const,
            reference: crypto.randomUUID()
          })),
          ...membershipRequests.slice(0, 1).map((mr: any) => ({
            type: "Members Request" as const,
            description: `New member request from ${mr.firstName} ${mr.lastName}`,
            date: new Date(mr.dateSubmitted).toISOString(),
            status: mr.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID()
          }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setActivities(newActivities);
      } catch (error) {
        setStats(prev => ({ ...prev, error: error as Error, loading: false }));
      }
    };

    fetchData();
  }, []);

  return { stats, activities };
};