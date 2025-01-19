import { useNavigate, useParams } from "react-router-dom";
import { BookForm } from "@/components/bookstore/BookForm";
import { useToast } from "@/hooks/use-toast";

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

  const handleSubmit = (data: any) => {
    toast({
      description: "Book updated successfully",
    });
    navigate("/bookstore");
  };

  // In a real application, you would fetch the book data using the id
  return <BookForm initialData={mockBook} onSubmit={handleSubmit} isEdit />;
}