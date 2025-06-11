import { useNavigate } from 'react-router-dom';
import { BookForm } from '@/components/bookstore/BookForm';
import { useToast } from '@/hooks/use-toast';
import { useCreateBook } from '@/hooks/services/books/hook';
import { useState } from 'react';

export default function CreateBook() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const createBookMutation = useCreateBook();

  const handleSubmit = async values => {
    console.log('submitting', values);
    setIsAdding(true);
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
      const data = await createBookMutation.mutateAsync(payload);
      toast({
        variant: 'default',
        description: data?.message || 'Book created successfully',
      });
      navigate('/bookstore');
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error?.response?.data?.message ||
          'An error occurred while creating the book',
      });
    } finally {
      setIsAdding(false);
    }
  };

  return <BookForm onSubmit={handleSubmit} />;
}
