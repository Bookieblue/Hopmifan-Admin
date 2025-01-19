export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  preferredContact: string;
  prayerRequest?: string;
  dateSubmitted: string;
  status: 'active' | 'inactive';
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  profilePicture?: string;
}

export type NewCustomer = Omit<Customer, 'id' | 'dateSubmitted' | 'status'>;

export interface Member extends Omit<Customer, 'billingAddress'> {
  preferredContact: string;
  prayerRequest: string;
  dateSubmitted: string;
}