import { useState, useEffect } from "react";

interface DashboardStats {
  totalMembers: number;
  totalDonations: number;
  totalEvents: number;
  totalBooks: number;
  membershipRequests: number;
  prayerRequests: number;
  contactMessages: number;
  newPayments: number;
}

export const useDashboardData = () => {
  const [stats, setStats] = useState<{ data: DashboardStats | null; loading: boolean }>({
    data: null,
    loading: true,
  });

  // Initialize local storage with sample data if empty
  if (!localStorage.getItem('eventRegistrations')) {
    localStorage.setItem('eventRegistrations', JSON.stringify([
      { eventName: "Sunday Service", attendee: "Mark Johnson", date: new Date().toISOString(), status: "confirmed" }
    ]));
  }

  if (!localStorage.getItem('prayerRequests')) {
    localStorage.setItem('prayerRequests', JSON.stringify([
      { firstName: "John", lastName: "Doe", request: "Healing for my mother", dateSubmitted: new Date().toISOString(), status: "pending" }
    ]));
  }

  if (!localStorage.getItem('contactMessages')) {
    localStorage.setItem('contactMessages', JSON.stringify([
      { firstName: "Jane", lastName: "Smith", message: "Interested in joining the choir", dateSubmitted: new Date().toISOString(), status: "pending" }
    ]));
  }

  if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify([
      { title: "Walking with God", price: 20, sales: 5, date: new Date().toISOString() }
    ]));
  }

  if (!localStorage.getItem('donations')) {
    localStorage.setItem('donations', JSON.stringify([
      { donor: "Michael Brown", amount: 100, date: new Date().toISOString(), status: "completed" }
    ]));
  }

  if (!localStorage.getItem('membershipRequests')) {
    localStorage.setItem('membershipRequests', JSON.stringify([
      { firstName: "Sarah", lastName: "Johnson", dateSubmitted: new Date().toISOString(), status: "pending" }
    ]));
  }

  if (!localStorage.getItem('payments')) {
    localStorage.setItem('payments', JSON.stringify([
      { id: "1", amount: 500, date: new Date().toISOString(), status: "pending", viewed: false }
    ]));
  }

  // Get viewed status from localStorage
  const getViewedStatus = (key: string) => {
    const viewed = localStorage.getItem(`${key}_viewed`);
    return viewed ? JSON.parse(viewed) : false;
  };

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      const eventRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
      const prayerRequests = JSON.parse(localStorage.getItem('prayerRequests') || '[]');
      const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      const donations = JSON.parse(localStorage.getItem('donations') || '[]');
      const membershipRequests = JSON.parse(localStorage.getItem('membershipRequests') || '[]');
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');

      // Calculate unviewed/pending counts
      const pendingPrayerRequests = prayerRequests.filter((pr: any) => pr.status === "pending").length;
      const pendingContactMessages = contactMessages.filter((cm: any) => cm.status === "pending").length;
      const pendingMembershipRequests = membershipRequests.filter((mr: any) => mr.status === "pending").length;
      const unviewedPayments = payments.filter((p: any) => !p.viewed).length;
      const pendingEventRegistrations = eventRegistrations.filter((er: any) => er.status === "pending").length;

      setStats({
        data: {
          totalMembers: 150,
          totalDonations: donations.length,
          totalEvents: eventRegistrations.length,
          totalBooks: books.length,
          membershipRequests: pendingMembershipRequests,
          prayerRequests: pendingPrayerRequests,
          contactMessages: pendingContactMessages,
          newPayments: unviewedPayments
        },
        loading: false,
      });

      // Create activities array
      const activities = [
        ...prayerRequests.slice(0, 1).map((pr: any) => ({
          type: "Prayer Request" as const,
          description: `Prayer request from ${pr.firstName} ${pr.lastName}: ${pr.request}`,
          date: pr.dateSubmitted,
          status: pr.status as "completed" | "pending" | "upcoming" | "confirmed",
          reference: crypto.randomUUID()
        })),
        ...eventRegistrations.slice(0, 1).map((er: any) => ({
          type: "Event Registration" as const,
          description: `${er.attendee} registered for ${er.eventName}`,
          date: er.date,
          status: er.status as "completed" | "pending" | "upcoming" | "confirmed",
          reference: crypto.randomUUID()
        })),
        ...contactMessages.slice(0, 1).map((cm: any) => ({
          type: "Contact" as const,
          description: `Contact message from ${cm.firstName} ${cm.lastName}`,
          date: cm.dateSubmitted,
          status: cm.status as "completed" | "pending" | "upcoming" | "confirmed",
          reference: crypto.randomUUID()
        })),
        ...donations.slice(0, 1).map((d: any) => ({
          type: "Donation" as const,
          description: `New donation from ${d.donor}`,
          amount: d.amount,
          date: d.date,
          status: d.status as "completed" | "pending" | "upcoming" | "confirmed",
          reference: crypto.randomUUID()
        })),
        ...books.filter((b: any) => b.sales > 0).slice(0, 1).map((b: any) => ({
          type: "Book Sale" as const,
          description: `New book sale "${b.title}"`,
          amount: b.price * b.sales,
          date: b.date,
          status: "completed" as "completed" | "pending" | "upcoming" | "confirmed",
          reference: crypto.randomUUID()
        })),
        ...membershipRequests.slice(0, 1).map((mr: any) => ({
          type: "Member Request" as const,
          description: `New member request from ${mr.firstName} ${mr.lastName}`,
          date: mr.dateSubmitted,
          status: mr.status as "completed" | "pending" | "upcoming" | "confirmed",
          reference: crypto.randomUUID()
        }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return activities;
    };

    fetchData();
  }, []);

  return { stats };
}