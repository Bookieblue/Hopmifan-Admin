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

const getStoredArticles = (): Record<string, BlogData> => {
  const stored = localStorage.getItem('articles');
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
};

export default function EditBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<BlogData | null>(null);

  useEffect(() => {
    const articles = getStoredArticles();
    if (id && articles[id]) {
      setInitialData(articles[id]);
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
      const articles = getStoredArticles();
      if (id) {
        articles[id] = {
          ...data,
          imagePreview: data.featureImage ? URL.createObjectURL(data.featureImage) : articles[id].imagePreview,
          publishDate: articles[id].publishDate
        };
        localStorage.setItem('articles', JSON.stringify(articles));
      }
      
      toast({
        description: "Article updated successfully!"
      });
      navigate("/articles");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update article"
      });
    }
  };

  if (!initialData) return null;

  return <BlogForm initialData={initialData} onSubmit={handleSubmit} isEdit />;
}