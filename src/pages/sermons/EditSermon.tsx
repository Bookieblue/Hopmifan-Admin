import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SermonForm } from "@/components/sermons/SermonForm";

type SermonData = {
  title: string;
  preacher: string;
  youtubeLink: string;
  content: string;
  status: "draft" | "published";
  thumbnailUrl?: string;
};

export default function EditSermon() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<SermonData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('sermons');
    if (stored) {
      try {
        const sermons = JSON.parse(stored);
        if (id && sermons[id]) {
          setInitialData(sermons[id]);
        } else {
          toast({
            variant: "destructive",
            description: "Sermon not found"
          });
          navigate("/sermons");
        }
      } catch (error) {
        console.error('Error parsing sermons:', error);
        toast({
          variant: "destructive",
          description: "Error loading sermon data"
        });
        navigate("/sermons");
      }
    } else {
      toast({
        variant: "destructive",
        description: "No sermons found"
      });
      navigate("/sermons");
    }
  }, [id, navigate, toast]);

  const handleSubmit = async (data: {
    title: string;
    preacher: string;
    youtubeLink: string;
    content: string;
    status: "draft" | "published";
    thumbnail: File | null;
  }) => {
    try {
      const stored = localStorage.getItem('sermons');
      const sermons = stored ? JSON.parse(stored) : {};
      
      if (id) {
        sermons[id] = {
          ...data,
          thumbnailUrl: data.thumbnail ? URL.createObjectURL(data.thumbnail) : sermons[id]?.thumbnailUrl
        };
        localStorage.setItem('sermons', JSON.stringify(sermons));
        
        toast({
          description: "Sermon updated successfully"
        });
        navigate("/sermons");
      }
    } catch (error) {
      console.error('Error updating sermon:', error);
      toast({
        variant: "destructive",
        description: "Failed to update sermon"
      });
    }
  };

  if (!initialData) {
    return null;
  }

  return <SermonForm initialData={initialData} onSubmit={handleSubmit} isEdit />;
}