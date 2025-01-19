import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";

const mockBook = {
  id: "1",
  title: "The Art of Programming",
  description: "A comprehensive guide to programming fundamentals",
  price: 29.99,
  author: "John Doe",
  authorBio: "Experienced programmer and educator",
  language: "English",
  pages: 300,
  dimensions: "6 x 9 inches",
  bookType: "Hardcover",
  status: "published",
  bookImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  authorImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
};

export default function ViewBook() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/bookstore")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Book Details</h1>
        </div>
        <Button onClick={() => navigate(`/bookstore/${mockBook.id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Book
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={mockBook.bookImage}
            alt={mockBook.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">{mockBook.title}</h2>
            <p className="text-lg text-gray-600 mt-2">${mockBook.price.toFixed(2)}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{mockBook.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Book Type</h3>
              <p>{mockBook.bookType}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Language</h3>
              <p>{mockBook.language}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Pages</h3>
              <p>{mockBook.pages}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Dimensions</h3>
              <p>{mockBook.dimensions}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">About the Author</h2>
        <div className="flex items-start gap-6">
          <img
            src={mockBook.authorImage}
            alt={mockBook.author}
            className="w-32 h-32 object-cover rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">{mockBook.author}</h3>
            <p className="text-gray-600">{mockBook.authorBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}