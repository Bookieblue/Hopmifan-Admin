export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  meetingLink?: string;
  imageUrl?: string;
  status: 'draft' | 'published';
}

export interface NewEvent {
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  meetingLink?: string;
  imageUrl?: string;
}