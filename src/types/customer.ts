export interface Customer {
  id: string;
  name: string;
  email: string;
  street?: string;
  country?: string;
  state?: string;
  postalCode?: string;
  billingAddress?: string;
  phone: string;
  address: string;
  totalSpent: string;
  date: string;
  profilePicture?: string;
  invoices: {
    id: string;
    date: string;
    amount: string;
    status: string;
  }[];
  estimates: {
    id: string;
    date: string;
    amount: string;
    status: string;
  }[];
  receipts: {
    id: string;
    date: string;
    amount: string;
    status: string;
  }[];
}

export interface NewCustomer {
  name: string;
  email: string;
  street?: string;
  country?: string;
  state?: string;
  postalCode?: string;
  billingAddress?: string;
}