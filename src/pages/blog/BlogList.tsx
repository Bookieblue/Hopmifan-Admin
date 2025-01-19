import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function BlogList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const postsPerPage = 15;
  
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string>("");
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
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    toast({
      description: `Blog ${blogToDelete} has been deleted successfully.`
    });
    setDeleteDialogOpen(false);
    setBlogToDelete("");
  };

  const handleShare = async (blogId: string) => {
    try {
      const url = `${window.location.origin}/blog/${blogId}`;
      await navigator.clipboard.writeText(url);
      toast({
        description: "Blog post link copied to clipboard!"
      });
    } catch (err) {
      toast({
        description: "Failed to copy link to clipboard",
        variant: "destructive"
      });
    }
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

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = !authorFilter || blog.author === authorFilter;
    const matchesStatus = !statusFilter || blog.status === statusFilter;
    const matchesDate = !dateFilter || blog.publishDate === dateFilter;
    
    return matchesSearch && matchesAuthor && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const uniqueAuthors = Array.from(new Set(blogs.map(blog => blog.author)));

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "export", label: "Export as CSV" },
    { value: "publish", label: "Publish Selected" },
    { value: "draft", label: "Move to Draft" },
  ];

  const handleRowClick = (id: string) => {
    navigate(`/blog/${id}/edit`);
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

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={authorFilter} onValueChange={setAuthorFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all-authors" value="">All Authors</SelectItem>
              {uniqueAuthors.map((author) => (
                <SelectItem key={author} value={author}>{author}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all-statuses" value="">All Statuses</SelectItem>
              <SelectItem key="published" value="published">Published</SelectItem>
              <SelectItem key="draft" value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="h-10"
          />
        </div>
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
          onRowClick={handleRowClick}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post
              and remove all of its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}