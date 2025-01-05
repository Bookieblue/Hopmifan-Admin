export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  amount: number;
  tax?: number;
  discount?: number;
  image?: File | null;
}