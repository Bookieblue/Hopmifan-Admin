// Duplicate of CreateBlog.tsx with "blog"/"Blog" replaced with "sermon"/"Sermon"
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SermonForm } from "@/components/sermons/SermonForm";

export default function CreateSermon() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: {
    title: string;
    content: string;
    author: string;
    status: "draft" | "published";
    featureImage: File | null;
    language: string;
  }) => {
    try {
      const stored = localStorage.getItem('sermons');
      const sermons = stored ? JSON.parse(stored) : {};
      
      const newId = `SER-${String(Object.keys(sermons).length + 1).padStart(3, '0')}`;
      
      sermons[newId] = {
        ...data,
        imagePreview: data.featureImage ? URL.createObjectURL(data.featureImage) : undefined,
        publishDate: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      };
      
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