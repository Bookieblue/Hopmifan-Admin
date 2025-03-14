import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogForm } from "@/components/blog/BlogForm";
import axios, { AxiosError } from "axios";
import { baseUrl } from "./BlogList";
import { useMutation, useQuery } from "@tanstack/react-query";

type BlogData = {
  title: string;
  content: string;
  author: string;
  status: "draft" | "published";
  imagePreview?: string;
  publishDate?: string;
  language?: string;
};

// const getStoredArticles = (): Record<string, BlogData> => {
//   const stored = localStorage.getItem('articles');
//   if (stored) {
//     return JSON.parse(stored);
//   }
//   return {};
// };

export default function EditBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false)

  const getArticleById = async () => {
    return (await axios.get(`${baseUrl}/api/articles/${id}`))?.data?.data
  };
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['get-article-by-id'],
    queryFn: getArticleById,
  });

  const articleError = error as AxiosError;
  const errorMessage = articleError?.message

  useEffect(() => {
    getArticleById()
  }, [id])

  const editBlog = async (payload: FormData) => {
    return (await axios.put(`${baseUrl}/api/articles/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }))?.data;
  };

  const editBlogMutation = useMutation({ mutationKey: ['edit-blog'], mutationFn: editBlog });
  const handleEditBlog = async (values) => {
    setIsEditing(true)
    const payload: FormData = new FormData();
    payload.append('title', values?.title.trim())
    payload.append('content', values?.content.trim())
    payload.append('author', values?.author.trim())
    payload.append('status', values?.status)
    payload.append('language', values?.language)
    if (values?.featureImage) payload.append('articleImage', values?.featureImage);
    try {
      await editBlogMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          console.log(data);
          toast({
            variant: "default",
            description: data?.message || "Article updated Successfully"
          });
          setIsEditing(false)
        }
      })
    }
    catch (error) {
      toast({
        variant: "destructive",
        description: error.message
      });
      setIsEditing(false)
    }
  }
  // useEffect(() => {
  //   const articles = getStoredArticles();
  //   if (id && articles[id]) {
  //     setInitialData(articles[id]);
  //   } else {
  //     toast({
  //       variant: "destructive",
  //       description: "Article not found"
  //     });
  //     navigate("/articles");
  //   }
  // }, [id, navigate, toast]);

  // const handleSubmit = async (data: {
  //   title: string;
  //   content: string;
  //   author: string;
  //   status: "draft" | "published";
  //   featureImage: File | null;
  //   language: string;
  // }) => {
  //   try {
  //     const articles = getStoredArticles();
  //     if (id) {
  //       articles[id] = {
  //         ...data,
  //         imagePreview: data.featureImage ? URL.createObjectURL(data.featureImage) : articles[id].imagePreview,
  //         publishDate: articles[id].publishDate,
  //         language: data.language
  //       };
  //       localStorage.setItem('articles', JSON.stringify(articles));
  //     }

  //     toast({
  //       description: "Article updated successfully!"
  //     });
  //     navigate("/articles");
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       description: "Failed to update article"
  //     });
  //   }
  // };



  return (
    <>
      {
        isLoading ? <div className="flex justify-center items-center p-6">
          <span className="animate-spin border-4 border-gray-300 border-t-gray-600 rounded-full w-6 h-6"></span>
          <span className="ml-3 text-gray-600">Loading articles...</span>
        </div> : isError ? <div className="text-center text-red-500 p-6">
          {errorMessage ?? 'Failed to load this article. Please reload this page.'}
        </div> : <BlogForm initialData={data} onSubmit={handleEditBlog} isEdit isLoading={isEditing}/>
      }
    </>)
}