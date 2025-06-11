import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { BlogForm } from '@/components/blog/BlogForm';
import { useState } from 'react';
import { useCreateArticle } from '@/hooks/useCreateArticle';

export default function CreateBlog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const createArticleMutation = useCreateArticle();

  const handleCreateArticle = async values => {
    setIsAdding(true);
    const payload: FormData = new FormData();
    payload.append('title', values?.title.trim());
    payload.append('content', values?.content.trim());
    payload.append('author', values?.author.trim());
    payload.append('status', values?.status);
    payload.append('language', values?.language);
    if (values?.featureImage)
      payload.append('articleImage', values?.featureImage);

    try {
      const data = await createArticleMutation.mutateAsync(payload);
      toast({
        variant: 'default',
        description: data?.message || 'Article created Successfully',
      });
      navigate('/articles');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: error?.response?.data.message || 'An error occurred',
      });
    } finally {
      setIsAdding(false);
    }
  };

  return <BlogForm onSubmit={handleCreateArticle} isLoading={isAdding} />;
}
