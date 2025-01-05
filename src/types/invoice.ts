export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface Invoice {
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
  type?: 'one-time' | 'recurring';
  items?: InvoiceItem[];
  notes?: string;
  terms?: string;
  footer?: string;
  dueDate?: string;
  paymentType?: 'one-time' | 'recurring';
  bankAccounts?: string[];
  paymentGateway?: string | null;
}