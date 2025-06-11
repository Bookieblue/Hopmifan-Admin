import { useMutation } from '@tanstack/react-query';
import api from '../api';

interface ArticleInterface {
  title: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  featureImage: File | null;
  language: string;
}

export const useCreateArticle = () => {
  const login = async (payload: ArticleInterface) => {
    const request = api.post('auth/articles', { ...payload });
    const response = await request;
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: login,
  });
  return mutation;
};
