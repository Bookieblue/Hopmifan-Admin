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
        const totalDonationsAmount = donations.reduce((acc: number, donation: any) => acc + (donation.amount || 0), 0);
        const bookstoreSalesAmount = 25000; // Sample data

        // Calculate unviewed/pending counts
        const pendingPrayerRequests = prayerRequests.filter((pr: any) => pr.status === "pending").length;
        const pendingMembershipRequests = membershipRequests.filter((mr: any) => mr.status === "pending").length;

        // Set stats data
        setStats({
          data: {
            totalMembers: 150,
            totalDonations: totalDonationsAmount,
            totalEvents: eventRegistrations.length,
            totalBooks: 25,
            membershipRequests: pendingMembershipRequests,
            prayerRequests: pendingPrayerRequests,
            contactMessages: contactMessages.length,
            newPayments: donations.length,
            bookstoreSales: bookstoreSalesAmount
          },
          loading: false,
          error: null
        });

        // Create activities array
        const newActivities: Activity[] = [
          ...eventRegistrations.map((er: any) => ({
            type: "Event Registration",
            description: `${er.firstName} ${er.lastName} registered for ${er.eventName}`,
            date: new Date(er.dateSubmitted).toISOString(),
            status: er.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID(),
            details: {
              firstName: er.firstName,
              lastName: er.lastName,
              email: er.email,
              phone: er.phone,
              country: er.country,
              cityState: er.cityState,
              eventName: er.eventName,
              dateSubmitted: er.dateSubmitted
            }
          })),
          ...prayerRequests.map((pr: any) => ({
            type: "Prayer Request",
            description: `Prayer request from ${pr.firstName} ${pr.lastName}`,
            date: new Date(pr.dateSubmitted).toISOString(),
            status: pr.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID(),
            details: {
              firstName: pr.firstName,
              lastName: pr.lastName,
              email: pr.email,
              phone: pr.phone,
              country: pr.country,
              cityState: pr.cityState,
              message: pr.prayerRequest,
              dateSubmitted: pr.dateSubmitted
            }
          })),
          ...donations.map((d: any) => ({
            type: "Donation",
            description: `New donation from ${d.firstName} ${d.lastName}`,
            amount: d.amount,
            date: new Date(d.dateSubmitted).toISOString(),
            status: d.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID(),
            details: {
              firstName: d.firstName,
              lastName: d.lastName,
              email: d.email,
              phone: d.phone,
              country: d.country,
              cityState: d.cityState,
              amount: d.amount,
              dateSubmitted: d.dateSubmitted
            }
          }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setActivities(newActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error as Error
        }));
      }
    };

    fetchData();
  }, []);

  return { stats, activities };
};
