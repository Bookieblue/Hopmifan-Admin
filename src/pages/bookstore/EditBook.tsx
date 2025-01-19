import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // In a real app, this would be fetched from an API
  const [title, setTitle] = useState("Sample Book");
  const [author, setAuthor] = useState("John Doe");
  const [price, setPrice] = useState("29.99");
  const [description, setDescription] = useState("A fascinating journey through the world of literature...");
  const [language, setLanguage] = useState("English");
  const [pages, setPages] = useState("320");
  const [dimensions, setDimensions] = useState("6 x 9 inches");
  const [authorBio, setAuthorBio] = useState("John Doe is a renowned author with multiple bestsellers...");
  const [imagePreview, setImagePreview] = useState("/placeholder.svg");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title || !author || !price) {
      toast({
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would be an API call
    toast({
      description: "Book updated successfully!"
    });
    navigate("/bookstore");
  };

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
        <h1 className="text-2xl font-bold">Edit Book</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">Title *</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-2">Author *</label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">Price *</label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter book price"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium mb-2">Language</label>
            <Input
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Enter book language"
            />
          </div>

          <div>
            <label htmlFor="pages" className="block text-sm font-medium mb-2">Pages</label>
            <Input
              id="pages"
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="Enter number of pages"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dimensions" className="block text-sm font-medium mb-2">Dimensions</label>
          <Input
            id="dimensions"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            placeholder="Enter book dimensions (e.g., 6 x 9 inches)"
          />
        </div>

        <div>
          <label htmlFor="authorBio" className="block text-sm font-medium mb-2">Author Bio</label>
          <Textarea
            id="authorBio"
            value={authorBio}
            onChange={(e) => setAuthorBio(e.target.value)}
            placeholder="Enter author biography"
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label htmlFor="bookImage" className="block text-sm font-medium mb-2">
            Book Cover Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            <label
              htmlFor="bookImage"
              className="cursor-pointer flex items-center justify-center w-full h-48 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload book cover
                  </span>
                </div>
              )}
              <input
                type="file"
                id="bookImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/bookstore")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}