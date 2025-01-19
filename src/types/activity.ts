export type ActivityType = "Donation" | "Publication" | "Event" | "Contact" | "Membership" | "Sermon";

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  date: string;
  amount: string;
  status: string;
  reference: string;
}