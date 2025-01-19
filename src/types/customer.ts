export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: string;
  date: string;
  invoices: any[];
  estimates: any[];
  receipts: any[];
}

export interface NewCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  cityState: string;
  preferredContact: string;
  prayerRequest?: string;
  dateSubmitted: string;
}