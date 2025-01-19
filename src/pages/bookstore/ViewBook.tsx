import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ViewBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, this would be fetched from an API
  const [book] = useState({
    id,
    title: "Sample Book",
    author: "John Doe",
    price: "$29.99",
    description: "A fascinating journey through the world of literature...",
    language: "English",
    pages: "320",
    dimensions: "6 x 9 inches",
    authorBio: "John Doe is a renowned author with multiple bestsellers...",
    image: "/placeholder.svg",
    status: "published"
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/bookstore")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">View Book</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={book.image}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">{book.title}</h2>
            <p className="text-xl text-gray-600 mt-2">by {book.author}</p>
            <p className="text-2xl font-bold text-purple-600 mt-4">{book.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{book.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold">Language</h3>
              <p className="text-gray-600">{book.language}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Pages</h3>
              <p className="text-gray-600">{book.pages}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Dimensions</h3>
              <p className="text-gray-600">{book.dimensions}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Status</h3>
              <p className="text-gray-600 capitalize">{book.status}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">About the Author</h3>
            <p className="text-gray-600">{book.authorBio}</p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/bookstore/${id}/edit`)}
            >
              Edit Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}