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

// Helper function to create a valid date string
const getValidDate = (daysAgo: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
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
        dateSubmitted: getValidDate(2),
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
        dateSubmitted: getValidDate(1),
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
        dateSubmitted: getValidDate(3),
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
        amount: 100000,
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
        dateSubmitted: getValidDate(4),
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
        const bookstoreSalesAmount = 250000; // Sample data

        // Set stats data
        setStats({
          data: {
            totalMembers: 150,
            totalDonations: totalDonationsAmount,
            totalEvents: 12,
            totalBooks: 25,
            membershipRequests: membershipRequests.filter((mr: any) => mr.status === "pending").length,
            prayerRequests: prayerRequests.filter((pr: any) => pr.status === "pending").length,
            contactMessages: contactMessages.length,
            newPayments: donations.length,
            bookstoreSales: bookstoreSalesAmount
          },
          loading: false,
          error: null
        });

        // Create activities array with proper date handling
        const newActivities: Activity[] = [
          ...eventRegistrations.map((er: any) => ({
            type: "Event Registration",
            description: `${er.firstName} ${er.lastName} registered for ${er.eventName}`,
            date: er.dateSubmitted || getValidDate(),
            status: er.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID()
          })),
          ...prayerRequests.map((pr: any) => ({
            type: "Prayer Request",
            description: `Prayer request from ${pr.firstName} ${pr.lastName}`,
            date: pr.dateSubmitted || getValidDate(),
            status: pr.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID()
          })),
          ...donations.map((d: any) => ({
            type: "Donation",
            description: `New donation from ${d.firstName} ${d.lastName}`,
            amount: d.amount,
            date: d.dateSubmitted || getValidDate(),
            status: d.status as "completed" | "pending" | "upcoming" | "confirmed",
            reference: crypto.randomUUID()
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