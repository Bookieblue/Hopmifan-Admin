import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogForm } from "@/components/blog/BlogForm";

type BlogData = {
  title: string;
  content: string;
  author: string;
  status: "draft" | "published";
  imagePreview?: string;
};

// This would typically come from your backend/API
const mockArticles: Record<string, BlogData> = {
  "1": {
    title: "How to Build React Apps",
    content: "<p>React is a powerful library for building user interfaces...</p>",
    author: "John Doe",
    status: "draft",
    imagePreview: "/path/to/image.jpg"
  },
  "2": {
    title: "TypeScript Best Practices",
    content: "<p>TypeScript adds static typing to JavaScript...</p>",
    author: "Jane Smith",
    status: "published"
  }
};

export default function EditBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<BlogData | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use our mock data
    if (id && mockArticles[id]) {
      setInitialData(mockArticles[id]);
    } else {
      toast({
        variant: "destructive",
        description: "Article not found"
      });
      navigate("/articles");
    }
  }, [id, navigate, toast]);

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