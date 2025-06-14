import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api';

interface EventInterface {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  meetingLink: string;
  status: string;
}

interface RegisteredEvent {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  cityAndState: string;
  methodOfContact: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
  event: {
    title: string;
  };
}

interface RegisteredEventsResponse {
  data: {
    events: RegisteredEvent[];
    totalItems: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export const useAddEvent = () => {};

export const useGetRegisteredEvents = () => {
  return useQuery({
    queryKey: ['registeredEvents'],
    queryFn: async () => {
      const response = await api.get<RegisteredEventsResponse>(
        'events/audience'
      );
      return response.data;
    },
  });
};
