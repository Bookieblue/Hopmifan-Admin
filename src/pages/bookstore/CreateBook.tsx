import { useNavigate } from "react-router-dom";
import { BookForm } from "@/components/bookstore/BookForm";
import { useToast } from "@/hooks/use-toast";

export default function CreateBook() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    toast({
      description: "Book created successfully",
    });
    navigate("/bookstore");
  };

  return <BookForm onSubmit={handleSubmit} />;
}