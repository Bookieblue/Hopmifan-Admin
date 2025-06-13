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

export interface Book {
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

interface UpdateBookStatusPayload {
  bookIds: string[];
}

interface DeleteBookPayload {
  bookIds: string[];
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

export const useUpdateBookStatus = () => {
  const updateBookStatus = async (
    payload: UpdateBookStatusPayload,
    action: 'publish' | 'unpublish'
  ) => {
    const token = localStorage.getItem('pass');
    setBearerToken(token);
    const response = await api.post(`books/${action}`, payload);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: ({
      payload,
      action,
    }: {
      payload: UpdateBookStatusPayload;
      action: 'publish' | 'unpublish';
    }) => updateBookStatus(payload, action),
  });

  return mutation;
};

export const useDeleteBook = () => {
  const deleteBook = async (payload: DeleteBookPayload) => {
    const token = localStorage.getItem('pass');
    setBearerToken(token);
    const response = await api.post('books/delete', payload);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: deleteBook,
  });

  return mutation;
};

export const useGetBook = (id: string) => {
  const getBook = async () => {
    const token = localStorage.getItem('pass');
    setBearerToken(token);
    const response = await api.get<{ data: Book }>(`books/${id}`);
    return response.data;
  };

  return useQuery({
    queryKey: ['book', id],
    queryFn: getBook,
    enabled: !!id,
  });
};

export const useUpdateBook = () => {
  const updateBook = async ({
    id,
    payload,
  }: {
    id: string;
    payload: FormData;
  }) => {
    const token = localStorage.getItem('pass');
    setBearerToken(token);
    const response = await api.put(`books/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: updateBook,
  });
  return mutation;
};
