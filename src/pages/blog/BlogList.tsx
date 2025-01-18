import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";

export default function BlogList() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  
  // Mock data - in a real app this would come from an API
  const [blogs] = useState(Array.from({ length: 32 }, (_, i) => ({ 
    id: `BLG-${String(i + 1).padStart(3, '0')}`,
    title: `Blog Post ${i + 1}`,
    author: i % 2 === 0 ? "Pastor John" : "Sarah Smith",
    publishDate: new Date(2024, 2, 15 - i).toISOString().split('T')[0],
    status: i % 3 === 0 ? "draft" : "published"
  })));

  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");
  const [bulkAction, setBulkAction] = useState("");

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Author", accessor: "author" },
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

  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      toast({
        description: `${selectedBlogs.length} blogs have been deleted.`
      });
      setSelectedBlogs([]);
    } else if (bulkAction === 'export') {
      toast({
        description: 'Blogs exported successfully.'
      });
    } else if (bulkAction === 'publish') {
      toast({
        description: `${selectedBlogs.length} blogs have been published.`
      });
      setSelectedBlogs([]);
    } else if (bulkAction === 'draft') {
      toast({
        description: `${selectedBlogs.length} blogs have been moved to draft.`
      });
      setSelectedBlogs([]);
    }
    setBulkAction("");
  };

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "export", label: "Export as CSV" },
    { value: "publish", label: "Publish Selected" },
    { value: "draft", label: "Move to Draft" },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(blogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  // Handler for page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          data={currentBlogs}
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
              setSelectedBlogs(currentBlogs.map(blog => blog.id));
            } else {
              setSelectedBlogs([]);
            }
          }}
          getItemId={(item) => item.id}
          actions={{
            onDelete: handleDelete,
            onShare: handleShare,
          }}
          bulkActions={bulkActions}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
          onRowClick={(id) => `/blog/${id}`}
        />
      </div>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}

      <ShareModal 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        blogId={selectedBlogId}
      />
    </div>
  );
}