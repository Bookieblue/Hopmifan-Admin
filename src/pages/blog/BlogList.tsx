import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BlogList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
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

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  const handleDelete = (blogId: string) => {
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      toast({
        description: `Blog ${blogToDelete} has been deleted successfully.`
      });
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const handleShare = (blogId: string) => {
    const blogUrl = `${window.location.origin}/blog/${blogId}`;
    
    navigator.clipboard.writeText(blogUrl).then(() => {
      toast({
        description: "Blog post link copied to clipboard!"
      });
    }).catch(() => {
      toast({
        description: "Failed to copy link",
        variant: "destructive"
      });
    });
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

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handleRowClick = (id: string) => {
    navigate(`/blog/${id}/edit`);
  };

  const handleApplyDateFilter = () => {
    // Filter logic would go here
    setIsDateFilterOpen(false);
    toast({
      description: "Date filter applied successfully"
    });
  };

  const handleResetDateFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setIsDateFilterOpen(false);
    toast({
      description: "Date filter reset"
    });
  };

  const filteredBlogsWithDate = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!startDate && !endDate) return matchesSearch;
    
    const blogDate = new Date(blog.publishDate);
    const afterStartDate = !startDate || blogDate >= startDate;
    const beforeEndDate = !endDate || blogDate <= endDate;
    
    return matchesSearch && afterStartDate && beforeEndDate;
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link to="/blog/create">
          <Button size="default" className="bg-purple-600 hover:bg-purple-700 px-3 md:px-4">
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search articles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDateFilterOpen} onOpenChange={setIsDateFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Filter by Date
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter by Date Range</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="flex flex-col gap-2">
                <label>Start Date</label>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>
              <div className="flex flex-col gap-2">
                <label>End Date</label>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleResetDateFilter}>
                  Reset
                </Button>
                <Button onClick={handleApplyDateFilter}>
                  Apply Filter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
