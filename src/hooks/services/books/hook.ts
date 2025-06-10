import { useMutation, useQuery } from '@tanstack/react-query';
import api, { setBearerToken } from '../api';

interface BookInterface {
  title: string;
  description: string;
  price: number;
  author: string;
  authorBio: string;
  language: string;
  pages: number;
  dimensions: string;
  bookType: string;
  status: 'draft' | 'published';
  bookImage: File | null;
  authorImage: File | null;
}

interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  rating: number;
  status: 'publish' | 'unpublish';
  language: string;
  bookType: string;
  pages: number;
  dimension: string;
  authorName: string;
  authorBio: string;
  authorImage: string | null;
  pdfUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BookListResponse {
  success: boolean;
  message: string;
  data: {
    books: Book[];
    totalItems: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export const useCreateBook = () => {
  const createBook = async (payload: FormData) => {
    const token = localStorage.getItem('pass');
    setBearerToken(token);
    const request = api.post('books', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const response = await request;
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createBook,
  });
  return mutation;
};

export const useGetBookList = () => {
  const getBooks = async () => {
    const token = localStorage.getItem('pass');
    setBearerToken(token);
    const response = await api.get<BookListResponse>('books');
    return response.data;
  };

  return useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });
};
