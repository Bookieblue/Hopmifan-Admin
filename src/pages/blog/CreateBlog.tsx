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
    // In a real app, this would be an API call
    const newPost = {
      id: `BLG-${Math.floor(Math.random() * 1000)}`,
      ...data,
      publishDate: new Date().toISOString(),
    };

    toast({
      description: `Article ${data.status === 'draft' ? 'saved as draft' : 'published'} successfully!`
    });
    
    navigate("/articles");
  };

  return <BlogForm onSubmit={handleSubmit} />;
}