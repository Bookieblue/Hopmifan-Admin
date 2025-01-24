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
  date: string;
};

export default function EditSermon() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<SermonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSermon = () => {
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

        const sermons: SermonData[] = JSON.parse(stored);
        const sermon = sermons.find(s => s.id === id);

        if (sermon) {
          setInitialData(sermon);
        } else {
          toast({
            variant: "destructive",
            description: "Sermon not found"
          });
          navigate("/sermons");
        }
      } catch (error) {
        console.error('Error fetching sermon:', error);
        toast({
          variant: "destructive",
          description: "Error loading sermon data"
        });
        navigate("/sermons");
      } finally {
        setIsLoading(false);
      }
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
      const stored = localStorage.getItem('sermons');
      if (!stored) throw new Error('No sermons found');

      const sermons: SermonData[] = JSON.parse(stored);
      const updatedSermons = sermons.map(sermon => {
        if (sermon.id === id) {
          return {
            ...sermon,
            ...data,
            thumbnailUrl: data.thumbnail ? URL.createObjectURL(data.thumbnail) : sermon.thumbnailUrl
          };
        }
        return sermon;
      });

      localStorage.setItem('sermons', JSON.stringify(updatedSermons));
      
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