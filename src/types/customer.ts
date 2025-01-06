export interface Customer {
  id: string;
  name: string;
  email: string;
  street?: string;
  country?: string;
  state?: string;
  postalCode?: string;
  billingAddress?: string;
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