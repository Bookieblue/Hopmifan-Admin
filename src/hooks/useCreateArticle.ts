import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '@/pages/blog/BlogList';

interface CreateArticlePayload {
  title: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  featureImage: File | null;
  language: string;
}

export const useCreateArticle = () => {
  const createArticle = async (payload: FormData) => {
    return (
      await axios.post(`${baseUrl}/api/articles`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    )?.data;
  };

  return useMutation({
    mutationFn: createArticle,
    mutationKey: ['create-article'],
  });
};
