import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SermonFormProps {
  initialData?: {
    title: string;
    preacher: string;
    youtubeLink: string;
    content: string;
    status: "draft" | "published";
    thumbnailUrl?: string;
  };
  onSubmit: (data: {
    title: string;
    preacher: string;
    youtubeLink: string;
    content: string;
    status: "draft" | "published";
    thumbnail: File | null;
  }) => void;
  isEdit?: boolean;
}

export function SermonForm({ initialData, onSubmit, isEdit = false }: SermonFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [preacher, setPreacher] = useState(initialData?.preacher ?? "");
  const [youtubeLink, setYoutubeLink] = useState(initialData?.youtubeLink ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(initialData?.thumbnailUrl ?? "");
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};
    
    if (!title.trim()) newErrors.title = true;
    if (!preacher.trim()) newErrors.preacher = true;
    if (!youtubeLink.trim()) newErrors.youtubeLink = true;
    if (!content.trim()) newErrors.content = true;
    
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

    onSubmit({
      title,
      preacher,
      youtubeLink,
      content,
      status: isDraft ? "draft" : "published",
      thumbnail
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
          onClick={() => navigate("/sermons")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add New'} Sermon</h1>
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
            placeholder="Enter sermon title"
            className={inputClassName('title')}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required</p>
          )}
        </div>

        <div>
          <label htmlFor="preacher" className="block text-sm font-medium mb-2">
            Preacher <span className="text-red-500">*</span>
          </label>
          <Input
            id="preacher"
            value={preacher}
            onChange={(e) => setPreacher(e.target.value)}
            placeholder="Enter preacher name"
            className={inputClassName('preacher')}
          />
          {errors.preacher && (
            <p className="text-red-500 text-sm mt-1">Preacher name is required</p>
          )}
        </div>

        <div>
          <label htmlFor="youtubeLink" className="block text-sm font-medium mb-2">
            YouTube Link <span className="text-red-500">*</span>
          </label>
          <Input
            id="youtubeLink"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            placeholder="Enter YouTube video link"
            className={inputClassName('youtubeLink')}
          />
          {errors.youtubeLink && (
            <p className="text-red-500 text-sm mt-1">YouTube link is required</p>
          )}
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
            Thumbnail Image
          </label>
          <div className="mt-1 flex items-center gap-4">
            <label
              htmlFor="thumbnail"
              className="cursor-pointer flex items-center justify-center w-full h-48 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none"
            >
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Preview"
                  className="h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload thumbnail image
                  </span>
                </div>
              )}
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter sermon description"
            rows={6}
            className={inputClassName('content')}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">Description is required</p>
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
