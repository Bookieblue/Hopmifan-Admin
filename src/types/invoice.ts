export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
  tax?: number;
  discount?: number;
  image?: File | null;
  deleted?: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  customer: string;
  amount: string;
  status: 'pending' | 'paid' | 'overdue';
  date: string;
  type: 'one-time' | 'recurring';
  items?: InvoiceItem[];
  notes?: string;
  terms?: string;
  dueDate?: string;
}