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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      toast({
        variant: "destructive",
        description: "Invalid sermon ID"
      });
      navigate("/sermons");
      return;
    }

    try {
      const stored = localStorage.getItem('sermons');
      if (!stored) {
        toast({
          variant: "destructive",
          description: "No sermons found"
        });
        navigate("/sermons");
        return;
      }

      const sermons = JSON.parse(stored);
      const sermon = sermons[id];

      if (!sermon) {
        toast({
          variant: "destructive",
          description: "Sermon not found"
        });
        navigate("/sermons");
        return;
      }

      setInitialData(sermon);
    } catch (error) {
      console.error('Error loading sermon:', error);
      toast({
        variant: "destructive",
        description: "Error loading sermon data"
      });
      navigate("/sermons");
    } finally {
      setLoading(false);
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
    if (!id) return;

    try {
      const stored = localStorage.getItem('sermons');
      const sermons = stored ? JSON.parse(stored) : {};
      
      sermons[id] = {
        ...data,
        thumbnailUrl: data.thumbnail 
          ? URL.createObjectURL(data.thumbnail) 
          : sermons[id]?.thumbnailUrl
      };

      localStorage.setItem('sermons', JSON.stringify(sermons));
      
      toast({
        description: "Sermon updated successfully"
      });
      
      navigate("/sermons");
    } catch (error) {
      console.error('Error updating sermon:', error);
      toast({
        variant: "destructive",
        description: "Failed to update sermon"
      });
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!initialData) {
    return null;
  }

  return <SermonForm initialData={initialData} onSubmit={handleSubmit} isEdit />;
}