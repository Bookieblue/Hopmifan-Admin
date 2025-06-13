import { useNavigate, useParams } from 'react-router-dom';
import { BookForm } from '@/components/bookstore/BookForm';
import { useToast } from '@/hooks/use-toast';
import { useGetBook, useUpdateBook } from '@/hooks/services/books/hook';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface BookFormValues {
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

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: bookResponse, isLoading } = useGetBook(id || '');
  const updateBookMutation = useUpdateBook();
  const queryClient = useQueryClient();

  const handleSubmit = async (values: BookFormValues) => {
    if (!id) return;
    setIsUpdating(true);
    const payload = new FormData();

    // Append text fields
    payload.append('title', values.title.trim());
    payload.append('description', values.description.trim());
    payload.append('price', values.price.toString());
    payload.append('authorName', values.author.trim());
    payload.append('authorBio', values.authorBio.trim());
    payload.append('language', values.language.trim());
    payload.append('pages', values.pages.toString());
    payload.append('dimension', values.dimensions || '');
    payload.append('bookType', values.bookType.trim());
    payload.append(
      'status',
      values.status === 'published' ? 'publish' : 'unpublish'
    );

    // Append files if they exist
    if (values.bookImage) payload.append('coverImage', values.bookImage);
    if (values.authorImage) payload.append('authorImage', values.authorImage);

    try {
      const data = await updateBookMutation.mutateAsync({ id, payload });
      toast({
        variant: 'default',
        description: data?.message || 'Book updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      navigate('/bookstore');
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error?.response?.data?.message ||
          'An error occurred while updating the book',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="page-container">Loading...</div>;
  }

  const book = bookResponse?.data;
  if (!book) {
    return <div className="page-container">Book not found</div>;
  }

  const initialData = {
    title: book.title,
    description: book.description,
    price: book.price,
    author: book.authorName,
    authorBio: book.authorBio,
    language: book.language,
    pages: book.pages,
    dimensions: book.dimension,
    bookType: book.bookType,
    status:
      book.status === 'publish' ? ('published' as const) : ('draft' as const),
    bookImage: book.coverImage,
    authorImage: book.authorImage,
  };

  return <BookForm initialData={initialData} onSubmit={handleSubmit} isEdit />;
}
