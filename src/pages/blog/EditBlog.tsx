import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogForm } from "@/components/blog/BlogForm";

export default function EditBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    // Mock data fetch - in a real app this would be an API call
    setInitialData({
      title: "Sample Article",
      content: "<p>This is the content of the article...</p>",
      author: "John Doe",
      status: "draft" as const,
    });
  }, [id]);

  const handleSubmit = async (data: {
    title: string;
    content: string;
    author: string;
    status: "draft" | "published";
    featureImage: File | null;
  }) => {
    // In a real app, this would be an API call
    const updatedPost = {
      id,
      ...data
    };

    toast({
      description: `Article ${data.status === 'draft' ? 'saved as draft' : 'published'} successfully!`
    });
    navigate("/articles");
  };

  if (!initialData) return null;

  return <BlogForm initialData={initialData} onSubmit={handleSubmit} isEdit />;
}