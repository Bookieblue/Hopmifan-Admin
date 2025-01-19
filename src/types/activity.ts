export type ActivityType = "Publication" | "Event" | "Contact" | "Donation" | "Membership" | "Sermon";

export interface Activity {
  type: ActivityType;
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
  reference: string;
  member: string;
}