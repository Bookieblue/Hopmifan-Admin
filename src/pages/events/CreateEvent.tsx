import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { NewEvent } from "@/types/event";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<NewEvent>({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
    meetingLink: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      description: "Event created successfully!"
    });
    navigate("/events");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Create New Event</h1>
        <p className="text-sm text-muted-foreground">
          Add a new event to your calendar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meetingLink">Meeting Link (Optional)</Label>
          <Input
            id="meetingLink"
            name="meetingLink"
            type="url"
            value={formData.meetingLink}
            onChange={handleChange}
            placeholder="https://"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Event Image (Optional)</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => navigate("/events")}>
            Cancel
          </Button>
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </div>
  );
}