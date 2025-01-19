export interface PrayerRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  state: string;
  preferredContact: 'email' | 'phone' | 'both';
  request: string;
  dateSubmitted: string;
  status: 'new' | 'in-progress' | 'completed';
}