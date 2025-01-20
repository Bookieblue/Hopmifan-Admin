import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface EventFormProps {
  initialData?: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    meetingLink: string;
    status: "draft" | "published";
    imageUrl?: string;
  };
  onSubmit: (data: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    meetingLink: string;
    status: "draft" | "published";
    featureImage: File | null;
  }) => void;
  isEdit?: boolean;
}

export function EventForm({ initialData, onSubmit, isEdit = false }: EventFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [date, setDate] = useState(initialData?.date ?? "");
  const [time, setTime] = useState(initialData?.time ?? "");
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [meetingLink, setMeetingLink] = useState(initialData?.meetingLink ?? "");
  const [featureImage, setFeatureImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl ?? "");
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeatureImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};
    
    if (!title.trim()) newErrors.title = true;
    if (!date) newErrors.date = true;
    if (!time) newErrors.time = true;
    if (!location.trim()) newErrors.location = true;
    if (!description.trim()) newErrors.description = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (isDraft: boolean) => {
    if (!isDraft && !validateForm()) {
      toast({
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      title,
      date,
      time,
      location,
      description,
      meetingLink,
      status: isDraft ? "draft" : "published",
      featureImage
    });
  };

  const inputClassName = (fieldName: string) => `${
    errors[fieldName] 
      ? 'border-red-500 focus-visible:ring-red-500' 
      : 'border-input focus-visible:ring-ring'
  }`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/events")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add New'} Event</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            className={inputClassName('title')}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClassName('date')}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">Date is required</p>
            )}
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-2">
              Time <span className="text-red-500">*</span>
            </label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputClassName('time')}
            />
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">Time is required</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter event location"
            className={inputClassName('location')}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">Location is required</p>
          )}
        </div>

        <div>
          <label htmlFor="meetingLink" className="block text-sm font-medium mb-2">Meeting Link (Optional)</label>
          <Input
            id="meetingLink"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="Enter virtual meeting link"
          />
        </div>

        <div>
          <label htmlFor="featureImage" className="block text-sm font-medium mb-2">
            Feature Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            <label
              htmlFor="featureImage"
              className="cursor-pointer flex items-center justify-center w-full h-48 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload event image
                  </span>
                </div>
              )}
              <input
                type="file"
                id="featureImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
            rows={6}
            className={inputClassName('description')}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">Description is required</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => handleSave(true)}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSave(false)}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
