export type PaymentMethod = 'Paystack' | 'Flutterwave' | 'Bank Transfer' | 'Cash';
export type GivingType = 'Tithe' | 'Offering' | 'Project' | 'Other';

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  givingType: GivingType;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  paymentMethod: PaymentMethod;
  status: 'completed' | 'pending' | 'failed';
}