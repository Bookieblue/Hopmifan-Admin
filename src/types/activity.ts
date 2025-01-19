export interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  member?: string;
}