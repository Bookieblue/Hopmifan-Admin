import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { EventForm } from '@/components/events/EventForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Define mutation using React Query
  const mutation = useMutation({
    mutationFn: async (data: {
      title: string;
      date: string;
      time: string;
      location: string;
      description: string;
      meetingLink: string;
      status: 'unpublish' | 'publish';
      featureImage: File | null;
    }) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('date', data.date);
      formData.append('time', data.time);
      formData.append('location', data.location);
      formData.append('meetingLink', data.meetingLink);
      formData.append('status', data.status);
      if (data.featureImage) {
        formData.append('eventImage', data.featureImage);
      }

      const pass = localStorage.getItem('pass');

      const response = await fetch(
        'https://homifan-website.vercel.app/api/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${pass}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        description: 'Event created successfully!',
      });
      navigate('/events');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        description: 'Failed to create event',
      });
    },
  });

  const handleSubmit = (data: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    meetingLink: string;
    status: 'unpublish' | 'publish';
    featureImage: File | null;
  }) => {
    mutation.mutate(data);
  };

  return <EventForm onSubmit={handleSubmit} />;
}
