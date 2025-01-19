import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogForm } from "@/components/blog/BlogForm";

export default function EditBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<{
    title: string;
    content: string;
    author: string;
    status: "draft" | "published";
  } | null>(null);

  useEffect(() => {
    // Mock data fetch - in a real app this would be an API call
    // Here we're simulating fetching the article with its current status
    const mockArticle = {
      title: "Sample Article",
      content: "<p>This is the content of the article...</p>",
      author: "John Doe",
      status: "draft" as "draft" | "published", // Explicitly type the status
    };
    setInitialData(mockArticle);
  }, [id]);

  const handleSubmit = async (data: {
    title: string;
    content: string;
    author: string;
    status: "draft" | "published";
    featureImage: File | null;
  }) => {
    try {
      // In a real app, this would be an API call
      console.log("Updating article:", { id, ...data });
      
      toast({
        description: `Article ${data.status === 'draft' ? 'saved as draft' : 'published'} successfully!`
      });
      navigate("/articles");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update article. Please try again."
      });
    }
  };

  if (!initialData) return null;

  return <BlogForm initialData={initialData} onSubmit={handleSubmit} isEdit />;
}