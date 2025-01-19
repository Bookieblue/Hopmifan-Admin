export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  cityState: string;
  preferredContact: string;
  prayerRequest: string;
  dateSubmitted: string;
}

export interface NewMember {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  cityState: string;
  preferredContact: string;
  prayerRequest: string;
}