import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SermonForm } from "@/components/sermons/SermonForm";

type SermonData = {
  title: string;
  preacher: string;
  youtubeLink: string;
  description: string;
  status: "draft" | "published";
  thumbnailImage?: string;
};

export default function EditSermon() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<SermonData | null>(null);

  useEffect(() => {
    const sermons = JSON.parse(localStorage.getItem('sermons') || '{}');
    if (id && sermons[id]) {
      setInitialData(sermons[id]);
    } else {
      toast({
        variant: "destructive",
        description: "Sermon not found"
      });
      navigate("/sermons");
    }
  }, [id, navigate, toast]);

  const handleSubmit = async (data: {
    title: string;
    preacher: string;
    youtubeLink: string;
    description: string;
    status: "draft" | "published";
    thumbnailImage: File | null;
  }) => {
    try {
      const sermons = JSON.parse(localStorage.getItem('sermons') || '{}');
      if (id) {
        sermons[id] = {
          ...data,
          thumbnailImage: data.thumbnailImage 
            ? URL.createObjectURL(data.thumbnailImage) 
            : sermons[id].thumbnailImage,
          publishDate: sermons[id].publishDate
        };
        localStorage.setItem('sermons', JSON.stringify(sermons));
      }
      
      toast({
        description: "Sermon updated successfully!"
      });
      navigate("/sermons");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update sermon"
      });
    }
  };

  if (!initialData) return null;

  return <SermonForm initialData={initialData} onSubmit={handleSubmit} isEdit />;
}