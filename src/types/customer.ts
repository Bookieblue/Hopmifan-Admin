export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
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
  totalSpent: string;
  date: string;
  invoices: Array<{
    id: string;
    date: string;
    amount: string;
    status: string;
  }>;
  estimates: Array<{
    id: string;
    date: string;
    amount: string;
    status: string;
  }>;
  receipts: Array<{
    id: string;
    date: string;
    amount: string;
    status: string;
  }>;
}

export type NewCustomer = Partial<Omit<Customer, 'id' | 'dateSubmitted' | 'status'>>;

export interface Member extends Omit<Customer, 'billingAddress'> {
  preferredContact: string;
  prayerRequest: string;
  dateSubmitted: string;
}