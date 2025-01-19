import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SermonForm } from "@/components/sermons/SermonForm";

export default function CreateSermon() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: {
    title: string;
    preacher: string;
    youtubeLink: string;
    content: string;
    status: "draft" | "published";
    thumbnail: File | null;
  }) => {
    try {
      // Get existing sermons
      const stored = localStorage.getItem('sermons');
      const sermons = stored ? JSON.parse(stored) : {};
      
      // Generate a new ID
      const newId = `SER-${String(Object.keys(sermons).length + 1).padStart(3, '0')}`;
      
      // Add new sermon
      sermons[newId] = {
        ...data,
        date: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        thumbnailUrl: data.thumbnail ? URL.createObjectURL(data.thumbnail) : undefined
      };
      
      // Save to localStorage
      localStorage.setItem('sermons', JSON.stringify(sermons));
      
      toast({
        description: `Sermon ${data.status === 'draft' ? 'saved as draft' : 'published'} successfully!`
      });
      navigate("/sermons");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to create sermon"
      });
    }
  };

  return <SermonForm onSubmit={handleSubmit} />;
}