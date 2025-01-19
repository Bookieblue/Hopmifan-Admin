import { useNavigate, useParams } from "react-router-dom";
import { BookForm } from "@/components/bookstore/BookForm";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const mockBook = {
  title: "The Art of Programming",
  description: "A comprehensive guide to programming fundamentals",
  price: 29.99,
  author: "John Doe",
  authorBio: "Experienced programmer and educator",
  language: "English",
  pages: 300,
  dimensions: "6 x 9 inches",
  bookType: "Hardcover",
  status: "published" as const,
};

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [book, setBook] = useState(mockBook);

  useEffect(() => {
    // In a real app, fetch book data here
    setBook(mockBook);
  }, [id]);

  const handleSubmit = (data: any) => {
    toast({
      description: "Book updated successfully",
    });
    navigate("/bookstore");
  };

  if (!book) return null;

  return <BookForm initialData={book} onSubmit={handleSubmit} isEdit />;
}