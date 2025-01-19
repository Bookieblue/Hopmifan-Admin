import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { EventForm } from "@/components/events/EventForm";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    meetingLink: string;
    status: "draft" | "published";
    featureImage: File | null;
  }) => {
    try {
      const stored = localStorage.getItem('events');
      const events = stored ? JSON.parse(stored) : {};
      
      const newId = `EVT-${String(Object.keys(events).length + 1).padStart(3, '0')}`;
      
      events[newId] = {
        ...data,
        imageUrl: data.featureImage ? URL.createObjectURL(data.featureImage) : undefined
      };
      
      localStorage.setItem('events', JSON.stringify(events));
      
      toast({
        description: `Event ${data.status === 'draft' ? 'saved as draft' : 'published'} successfully!`
      });
      navigate("/events");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to create event"
      });
    }
  };

  return <EventForm onSubmit={handleSubmit} />;
}