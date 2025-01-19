import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogForm } from "@/components/blog/BlogForm";

export default function CreateBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: {
    title: string;
    content: string;
    author: string;
    status: "draft" | "published";
    featureImage: File | null;
  }) => {
    try {
      // Get existing articles
      const stored = localStorage.getItem('articles');
      const articles = stored ? JSON.parse(stored) : {};
      
      // Generate a new ID
      const newId = `ART-${String(Object.keys(articles).length + 1).padStart(3, '0')}`;
      
      // Add new article
      articles[newId] = {
        id: newId,
        ...data,
        publishDate: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        imagePreview: data.featureImage ? URL.createObjectURL(data.featureImage) : undefined
      };
      
      // Save to localStorage
      localStorage.setItem('articles', JSON.stringify(articles));
      
      toast({
        description: `Article ${data.status === 'draft' ? 'saved as draft' : 'published'} successfully!`
      });
      navigate("/articles");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to create article"
      });
    }
  };

  return <BlogForm onSubmit={handleSubmit} />;
}