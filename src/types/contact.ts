export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityState: string;
  preferredContact: "email" | "phone";
  message: string;
  dateSubmitted: string;
  replied: boolean;
};