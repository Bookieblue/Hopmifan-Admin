export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface Invoice {
  number: string;
  date: string;
  currency: string;
  customer: any;
  items: InvoiceItem[];
  notes: string;
  terms: string;
}