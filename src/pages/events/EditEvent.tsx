import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { EventForm } from "@/components/events/EventForm";

type EventData = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  meetingLink: string;
  status: "draft" | "published";
  imageUrl?: string;
};

export default function EditEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<EventData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('events');
    if (stored && id) {
      const events = JSON.parse(stored);
      if (events[id]) {
        setInitialData(events[id]);
      } else {
        toast({
          variant: "destructive",
          description: "Event not found"
        });
        navigate("/events");
      }
    }
  }, [id, navigate, toast]);

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
      if (stored && id) {
        const events = JSON.parse(stored);
        events[id] = {
          ...data,
          imageUrl: data.featureImage ? URL.createObjectURL(data.featureImage) : events[id].imageUrl
        };
        localStorage.setItem('events', JSON.stringify(events));
      }
      
      toast({
        description: "Event updated successfully!"
      });
      navigate("/events");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update event"
      });
    }
  };

  if (!initialData) return null;

  return <EventForm initialData={initialData} onSubmit={handleSubmit} isEdit />;
}