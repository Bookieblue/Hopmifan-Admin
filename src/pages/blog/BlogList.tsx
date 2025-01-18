import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogList() {
  const { toast } = useToast();
  const [blogs] = useState([
    { 
      id: "BLG-001",
      title: "Welcome to Our Church",
      author: "Pastor John",
      publishDate: "2024-03-15",
      status: "published",
      category: "Announcements"
    },
    { 
      id: "BLG-002",
      title: "Sunday Service Highlights",
      author: "Sarah Smith",
      publishDate: "2024-03-14",
      status: "draft",
      category: "Events"
    },
  ]);

  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Author", accessor: "author" },
    { header: "Category", accessor: "category" },
    { header: "Date", accessor: "publishDate" },
    { 
      header: "Status", 
      accessor: (blog: any) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {blog.status}
        </span>
      )
    },
  ];

  const handleDelete = (blogId: string) => {
    toast({
      description: `Blog ${blogId} has been deleted successfully.`
    });
  };

  const handleShare = (blogId: string) => {
    setSelectedBlogId(blogId);
    setShareDialogOpen(true);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Publications - Blog Posts</h1>
        <Link to="/blog/create">
          <Button size="default" className="bg-purple-600 hover:bg-purple-700 px-3 md:px-4">
            <Plus className="h-4 w-4 mr-2" />
            New Blog Post
          </Button>
        </Link>
      </div>

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={blogs}
          columns={columns}
          selectedItems={selectedBlogs}
          onSelectItem={(id, checked) => {
            if (checked) {
              setSelectedBlogs([...selectedBlogs, id]);
            } else {
              setSelectedBlogs(selectedBlogs.filter(blogId => blogId !== id));
            }
          }}
          onSelectAll={(checked) => {
            if (checked) {
              setSelectedBlogs(blogs.map(blog => blog.id));
            } else {
              setSelectedBlogs([]);
            }
          }}
          getItemId={(item) => item.id}
          actions={{
            onDelete: handleDelete,
            onShare: handleShare,
          }}
          onRowClick={(id) => `/blog/${id}`}
        />
      </div>

      <ShareModal 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        blogId={selectedBlogId}
      />
    </div>
  );
}