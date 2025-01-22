import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface BookFormProps {
  initialData?: {
    title: string;
    description: string;
    price: number;
    author: string;
    authorBio: string;
    language: string;
    pages: number;
    dimensions: string;
    bookType: string;
    status: "draft" | "published";
    bookImage?: string;
    authorImage?: string;
  };
  onSubmit: (data: {
    title: string;
    description: string;
    price: number;
    author: string;
    authorBio: string;
    language: string;
    pages: number;
    dimensions: string;
    bookType: string;
    status: "draft" | "published";
    bookImage: File | null;
    authorImage: File | null;
  }) => void;
  isEdit?: boolean;
}

const DEFAULT_AUTHOR = "Segun Adewunmi";
const DEFAULT_AUTHOR_BIO = "Whether you're looking for in-depth Bible studies or encouragement for life's challenges, you'll find the perfect resource here. Strengthen your prayer life with our dedicated prayer books and guides. These publications provide practical steps for effective prayer, intercession, and seeking God's will.";
const DEFAULT_AUTHOR_IMAGE = "/lovable-uploads/a7e3d08f-9128-4e8b-a73b-9624c392a130.png";

export function BookForm({ initialData, onSubmit, isEdit = false }: BookFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [price, setPrice] = useState(initialData?.price ?? 0);
  const [author, setAuthor] = useState(initialData?.author ?? DEFAULT_AUTHOR);
  const [authorBio, setAuthorBio] = useState(initialData?.authorBio ?? DEFAULT_AUTHOR_BIO);
  const [language, setLanguage] = useState(initialData?.language ?? "");
  const [pages, setPages] = useState(initialData?.pages ?? 0);
  const [dimensions, setDimensions] = useState(initialData?.dimensions ?? "");
  const [bookType, setBookType] = useState(initialData?.bookType ?? "");
  const [bookImage, setBookImage] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState<File | null>(null);
  const [bookImagePreview, setBookImagePreview] = useState<string>(initialData?.bookImage ?? "");
  const [authorImagePreview, setAuthorImagePreview] = useState<string>(initialData?.authorImage ?? DEFAULT_AUTHOR_IMAGE);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [customAuthorProfile, setCustomAuthorProfile] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'book' | 'author') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'book') {
        setBookImage(file);
      } else {
        setAuthorImage(file);
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'book') {
          setBookImagePreview(reader.result as string);
        } else {
          setAuthorImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};
    
    if (!title.trim()) newErrors.title = true;
    if (!description.trim()) newErrors.description = true;
    if (price <= 0) newErrors.price = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (isDraft: boolean) => {
    if (!isDraft && !validateForm()) {
      toast({
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Reset to default values if custom profile is not enabled
    const finalAuthor = customAuthorProfile ? author : DEFAULT_AUTHOR;
    const finalAuthorBio = customAuthorProfile ? authorBio : DEFAULT_AUTHOR_BIO;
    const finalAuthorImage = customAuthorProfile ? authorImage : null;

    onSubmit({
      title,
      description,
      price,
      author: finalAuthor,
      authorBio: finalAuthorBio,
      language,
      pages,
      dimensions,
      bookType,
      status: isDraft ? "draft" : "published",
      bookImage,
      authorImage: finalAuthorImage
    });
  };

  const inputClassName = (fieldName: string) => `${
    errors[fieldName] 
      ? 'border-red-500 focus-visible:ring-red-500' 
      : 'border-input focus-visible:ring-ring'
  }`;

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
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add New'} Book</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            className={inputClassName('title')}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
            className={`min-h-[100px] ${inputClassName('description')}`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">Description is required</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Enter price"
              min="0"
              step="0.01"
              className={inputClassName('price')}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">Price must be greater than 0</p>
            )}
          </div>

          <div>
            <label htmlFor="bookType" className="block text-sm font-medium mb-2">Book Type</label>
            <Input
              id="bookType"
              value={bookType}
              onChange={(e) => setBookType(e.target.value)}
              placeholder="E.g., Hardcover, Paperback"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium mb-2">Language</label>
            <Input
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Enter language"
            />
          </div>

          <div>
            <label htmlFor="pages" className="block text-sm font-medium mb-2">Pages</label>
            <Input
              id="pages"
              type="number"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              placeholder="Enter number of pages"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="dimensions" className="block text-sm font-medium mb-2">Dimensions</label>
            <Input
              id="dimensions"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="E.g., 6 x 9 inches"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Author's Profile</h2>
            <div className="flex items-center space-x-2">
              <Switch
                id="custom-author"
                checked={customAuthorProfile}
                onCheckedChange={setCustomAuthorProfile}
              />
              <Label htmlFor="custom-author">Custom Author Profile</Label>
            </div>
          </div>

          {customAuthorProfile ? (
            <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="author" className="block text-sm font-medium mb-2">
                    Author Name
                  </label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                    className={inputClassName('author')}
                  />
                </div>

                <div>
                  <label htmlFor="authorBio" className="block text-sm font-medium mb-2">
                    Author Bio
                  </label>
                  <Textarea
                    id="authorBio"
                    value={authorBio}
                    onChange={(e) => setAuthorBio(e.target.value)}
                    placeholder="Enter author biography"
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Author Image</label>
                  <div className="mt-1">
                    <label
                      htmlFor="authorImage"
                      className="cursor-pointer flex items-center justify-center w-full h-48 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none"
                    >
                      {authorImagePreview ? (
                        <img
                          src={authorImagePreview}
                          alt="Author preview"
                          className="h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-12 h-12 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">
                            Click to upload author photo
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="authorImage"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, 'author')}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-4">
                <img
                  src={DEFAULT_AUTHOR_IMAGE}
                  alt="Default author"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{DEFAULT_AUTHOR}</h3>
                  <p className="mt-1 text-sm text-gray-500">{DEFAULT_AUTHOR_BIO}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => handleSave(true)}
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSave(false)}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
