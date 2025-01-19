import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface BlogFormProps {
  initialData?: {
    title: string;
    content: string;
    author: string;
    status: "draft" | "published";
    imagePreview?: string;
  };
  onSubmit: (data: {
    title: string;
    content: string;
    author: string;
    status: "draft" | "published";
    featureImage: File | null;
  }) => void;
  isEdit?: boolean;
}

export function BlogForm({ initialData, onSubmit, isEdit = false }: BlogFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [author, setAuthor] = useState(initialData?.author ?? "");
  const [featureImage, setFeatureImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.imagePreview ?? "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeatureImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (isDraft: boolean) => {
    if (!title || !content || !author) {
      toast({
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      title,
      content,
      author,
      status: isDraft ? "draft" : "published",
      featureImage
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/articles")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add New'} Article</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-2">Author</label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label htmlFor="featureImage" className="block text-sm font-medium mb-2">
            Feature Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            <label
              htmlFor="featureImage"
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
                    Click to upload feature image
                  </span>
                </div>
              )}
              <input
                type="file"
                id="featureImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            init={{
              height: 500,
              menubar: false,
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
              content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:16px }',
              branding: false,
              promotion: false
            }}
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
          />
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
