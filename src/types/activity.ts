export type ActivityType = "Publication" | "Event" | "Contact" | "Donation" | "Membership" | "Sermon";

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  amount: string;
  date: string;
  status: "completed" | "pending" | "failed";
  reference: string;
  member?: string;
}