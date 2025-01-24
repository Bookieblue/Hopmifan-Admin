// Duplicate of EditBlog.tsx with "blog"/"Blog" replaced with "sermon"/"Sermon"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SermonForm } from "@/components/sermons/SermonForm";

type SermonData = {
  title: string;
  content: string;
  author: string;
  status: "draft" | "published";
  imagePreview?: string;
  publishDate?: string;
  language?: string;
};

const getStoredSermons = (): Record<string, SermonData> => {
  const stored = localStorage.getItem('sermons');
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
};

export default function EditSermon() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<SermonData | null>(null);

  useEffect(() => {
    const sermons = getStoredSermons();
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
    content: string;
    author: string;
    status: "draft" | "published";
    featureImage: File | null;
    language: string;
  }) => {
    try {
      const sermons = getStoredSermons();
      if (id) {
        sermons[id] = {
          ...data,
          imagePreview: data.featureImage ? URL.createObjectURL(data.featureImage) : sermons[id].imagePreview,
          publishDate: sermons[id].publishDate,
          language: data.language
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