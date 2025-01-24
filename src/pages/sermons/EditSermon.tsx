import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SermonForm } from "@/components/sermons/SermonForm";

type SermonData = {
  id: string;
  title: string;
  preacher: string;
  youtubeLink: string;
  content: string;
  status: "draft" | "published";
  thumbnailUrl?: string;
};

const getStoredSermons = (): Record<string, SermonData> => {
  try {
    const stored = localStorage.getItem('sermons');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing sermons from localStorage:', error);
  }
  return {};
};

export default function EditSermon() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<SermonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSermon = () => {
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
      setIsLoading(false);
    };

    fetchSermon();
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
      const sermons = getStoredSermons();
      if (id) {
        sermons[id] = {
          ...sermons[id],
          ...data,
          thumbnailUrl: data.thumbnail ? URL.createObjectURL(data.thumbnail) : sermons[id].thumbnailUrl
        };
        localStorage.setItem('sermons', JSON.stringify(sermons));
      }
      
      toast({
        description: "Sermon updated successfully!"
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#695CAE]"></div>
      </div>
    );
  }

  if (!initialData) {
    return null;
  }

  return <SermonForm initialData={initialData} onSubmit={handleSubmit} isEdit />;
}