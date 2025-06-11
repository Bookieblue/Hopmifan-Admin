import { useMutation, useQuery } from '@tanstack/react-query';
import api, { setBearerToken } from '../api';

interface SermonInterface {
  title: string;
  preacher: string;
  description: string;
  link: string;
  thumbnail: File | null;
  status: 'draft' | 'published';
}

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  description: string;
  link: string;
  status: 'publish' | 'unpublish';
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SermonListResponse {
  success: boolean;
  message: string;
  data: {
    sermons: Sermon[];
    totalItems: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export const useCreateSermon = () => {
  const createSermon = async (payload: FormData) => {
    const token = localStorage.getItem('pass');
    setBearerToken(token);
    const response = await api.post('sermons', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createSermon,
  });
  return mutation;
};

export const useGetSermons = () => {
  const getSermons = async () => {
    const token = localStorage.getItem('pass');
    setBearerToken(token);
    const response = await api.get<SermonListResponse>('sermons');
    return response.data;
  };

  return useQuery({
    queryKey: ['sermons'],
    queryFn: getSermons,
  });
};
