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

// Initialize localStorage with sample data if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem('eventRegistrations')) {
    localStorage.setItem('eventRegistrations', JSON.stringify([
      { 
        eventName: "Sunday Service", 
        firstName: "Mark",
        lastName: "Johnson",
        email: "mark@example.com",
        phone: "+1234567890",
        country: "United States",
        cityState: "California",
        dateSubmitted: getValidDate(),
        status: "confirmed" 
      }
    ]));
  }

  if (!localStorage.getItem('prayerRequests')) {
    localStorage.setItem('prayerRequests', JSON.stringify([
      { 
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1234567890",
        country: "United States",
        cityState: "New York",
        prayerRequest: "Healing for my mother",
        dateSubmitted: getValidDate(),
        status: "pending" 
      }
    ]));
  }

  if (!localStorage.getItem('contactMessages')) {
    localStorage.setItem('contactMessages', JSON.stringify([
      { 
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "+1234567890",
        country: "United States",
        cityState: "Texas",
        message: "Interested in joining the choir",
        dateSubmitted: getValidDate(),
        status: "pending" 
      }
    ]));
  }

  if (!localStorage.getItem('donations')) {
    localStorage.setItem('donations', JSON.stringify([
      { 
        firstName: "Michael",
        lastName: "Brown",
        email: "michael@example.com",
        phone: "+1234567890",
        country: "United States",
        cityState: "Florida",
        amount: 100,
        dateSubmitted: getValidDate(),
        status: "completed" 
      }
    ]));
  }

  if (!localStorage.getItem('membershipRequests')) {
    localStorage.setItem('membershipRequests', JSON.stringify([
      { 
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@example.com",
        phone: "+1234567890",
        country: "United States",
        cityState: "Arizona",
        message: "Interested in becoming a member",
        dateSubmitted: getValidDate(),
        status: "pending" 
      }
    ]));
  }
};

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardData["stats"]>({
    data: null,
    loading: true,
    error: null
  });

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        // Initialize localStorage if needed
        initializeLocalStorage();

        // Fetch data from localStorage
        const eventRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
        const prayerRequests = JSON.parse(localStorage.getItem('prayerRequests') || '[]');
        const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        const membershipRequests = JSON.parse(localStorage.getItem('membershipRequests') || '[]');

        // Calculate totals and stats
        const totalDonationsAmount = donations.reduce((acc: number, donation: any) => acc + donation.amount, 0);

        // Calculate unviewed/pending counts
        const pendingPrayerRequests = prayerRequests.filter((pr: any) => pr.status === "pending").length;
        const pendingContactMessages = contactMessages.filter((cm: any) => cm.status === "pending").length;
        const pendingMembershipRequests = membershipRequests.filter((mr: any) => mr.status === "pending").length;

        setStats({
          data: {
            totalMembers: 150,
            totalDonations: totalDonationsAmount,
            totalEvents: eventRegistrations.length,
            totalBooks: 25,
            membershipRequests: pendingMembershipRequests,
            prayerRequests: pendingPrayerRequests,
            contactMessages: pendingContactMessages,
            newPayments: donations.length,
            bookstoreSales: 1500
          },
          loading: false,
          error: null
        });

        // Create activities array with proper formatting
        const newActivities: Activity[] = [
          ...prayerRequests.map((pr: any) => ({
            type: "Prayer Request" as const,
            description: `Prayer request from ${pr.firstName} ${pr.lastName}`,
            date: new Date(pr.dateSubmitted).toISOString(),
            status: pr.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID(),
            firstName: pr.firstName,
            lastName: pr.lastName,
            email: pr.email,
            phone: pr.phone,
            country: pr.country,
            cityState: pr.cityState,
            message: pr.prayerRequest,
            dateSubmitted: pr.dateSubmitted
          })),
          ...eventRegistrations.map((er: any) => ({
            type: "Event Registration" as const,
            description: `${er.firstName} ${er.lastName} registered for ${er.eventName}`,
            date: new Date(er.dateSubmitted).toISOString(),
            status: er.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID(),
            firstName: er.firstName,
            lastName: er.lastName,
            email: er.email,
            phone: er.phone,
            country: er.country,
            cityState: er.cityState,
            eventName: er.eventName,
            dateSubmitted: er.dateSubmitted
          })),
          ...contactMessages.map((cm: any) => ({
            type: "Contact" as const,
            description: `New message from ${cm.firstName} ${cm.lastName}`,
            date: new Date(cm.dateSubmitted).toISOString(),
            status: cm.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID(),
            firstName: cm.firstName,
            lastName: cm.lastName,
            email: cm.email,
            phone: cm.phone,
            country: cm.country,
            cityState: cm.cityState,
            message: cm.message,
            dateSubmitted: cm.dateSubmitted
          })),
          ...donations.map((d: any) => ({
            type: "Donation" as const,
            description: `New donation from ${d.firstName} ${d.lastName}`,
            amount: d.amount,
            date: new Date(d.dateSubmitted).toISOString(),
            status: d.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID(),
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email,
            phone: d.phone,
            country: d.country,
            cityState: d.cityState,
            dateSubmitted: d.dateSubmitted
          })),
          ...membershipRequests.map((mr: any) => ({
            type: "Members Request" as const,
            description: `Membership request from ${mr.firstName} ${mr.lastName}`,
            date: new Date(mr.dateSubmitted).toISOString(),
            status: mr.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID(),
            firstName: mr.firstName,
            lastName: mr.lastName,
            email: mr.email,
            phone: mr.phone,
            country: mr.country,
            cityState: mr.cityState,
            message: mr.message,
            dateSubmitted: mr.dateSubmitted
          }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setActivities(newActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats(prev => ({
          ...prev,
          error: error as Error,
          loading: false
        }));
      }
    };

    fetchData();
  }, []);

  return { stats, activities };
};