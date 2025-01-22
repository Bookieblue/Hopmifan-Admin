export type ActivityType = "Prayer Request" | "Event Registration" | "Contact" | "Donation" | "Book Sale" | "Membership" | "Publication" | "Event" | "Sermon";

export interface Activity {
  type: ActivityType;
  description: string;
  amount?: number;
  date: string;
  status: "completed" | "pending" | "upcoming" | "confirmed";
  reference: string;
  member?: string;
}