import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogForm } from "@/components/blog/BlogForm";
import axios from "axios";
import { baseUrl } from "./BlogList";
import { getUniqPayload } from "recharts/types/util/payload/getUniqPayload";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function CreateBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false)

  const createArticle = async(payload: FormData) => {
    return (await axios.post(`${baseUrl}/api/articles`, payload, {headers:{
      'Content-Type': 'multipart/form-data'}
    }))?.data
  }

  const createArticleMutation = useMutation({mutationFn: createArticle, mutationKey: ['create-article']})
  const handleCreateArticle = async(values) => {
    setIsAdding(true)
    const payload: FormData = new FormData();
    payload.append('title', values?.title.trim())
    payload.append('content', values?.content.trim())
    payload.append('author', values?.author.trim())
    payload.append('status', values?.status)
    payload.append('language', values?.language)
    if (values?.featureImage) payload.append('articleImage', values?.featureImage);
    try {
      await createArticleMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toast({
            variant: "default",
            description: data?.message || "Article created Successfully"
          });
          setIsAdding(false)
        }
      })
    }
    catch (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data.message || "An error occured"
      });
      setIsAdding(true)
    }
  }

  const handleSubmit = async (data: {
    title: string;
    content: string;
    author: string;
    status: "draft" | "published";
    featureImage: File | null;
    language: string;
  }) => {
    try {
      // Get existing articles
      const stored = localStorage.getItem('articles');
      const articles = stored ? JSON.parse(stored) : {};
      
      // Generate a new ID
      const newId = `ART-${String(Object.keys(articles).length + 1).padStart(3, '0')}`;
      
      // Add new article
      articles[newId] = {
        ...data,
        imagePreview: data.featureImage ? URL.createObjectURL(data.featureImage) : undefined,
        publishDate: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
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

  return <BlogForm onSubmit={handleCreateArticle} isLoading={isAdding}/>;
}