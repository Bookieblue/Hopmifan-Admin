import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { FilterModal } from "@/components/blog/FilterModal";
import { BulkActions } from "@/components/shared/BulkActions";
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
import { BlogCard } from "@/components/blog/BlogCard";

const sampleArticles = {
  "ART-001": {
    title: "The Future of Web Development: AI and Machine Learning",
    content: "<p>Artificial Intelligence and Machine Learning are revolutionizing how we build and maintain web applications. This article explores the latest trends and their impact on developers.</p>",
    author: "Sarah Johnson",
    publishDate: new Date(2024, 2, 15).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    imagePreview: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  "ART-002": {
    title: "Building Scalable React Applications",
    content: "<p>Learn the best practices for building large-scale React applications that can handle growing user bases and complex features.</p>",
    author: "Michael Chen",
    publishDate: new Date(2024, 2, 14).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    imagePreview: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  "ART-003": {
    title: "The Rise of TypeScript in Modern Development",
    content: "<p>TypeScript has become an essential tool in modern web development. Discover why more developers are choosing TypeScript and how it improves code quality.</p>",
    author: "Emily Rodriguez",
    publishDate: new Date(2024, 2, 13).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "draft",
    imagePreview: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  "ART-004": {
    title: "Mastering CSS Grid and Flexbox",
    content: "<p>A comprehensive guide to modern CSS layout techniques using Grid and Flexbox, with practical examples and best practices.</p>",
    author: "David Kim",
    publishDate: new Date(2024, 2, 12).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    imagePreview: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  "ART-005": {
    title: "Introduction to Web Accessibility",
    content: "<p>Learn why web accessibility is crucial and how to implement WCAG guidelines in your web applications to create inclusive experiences.</p>",
    author: "Rachel Thompson",
    publishDate: new Date(2024, 2, 11).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "draft",
    imagePreview: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  }
};

export default function BlogList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const postsPerPage = 15;
  
  const [blogs, setBlogs] = useState(() => {
    const stored = localStorage.getItem('articles');
    if (stored) {
      const articles = JSON.parse(stored);
      return Object.entries(articles).map(([id, article]: [string, any]) => ({
        id,
        ...article
      }));
    }
    localStorage.setItem('articles', JSON.stringify(sampleArticles));
    return Object.entries(sampleArticles).map(([id, article]) => ({
      id,
      ...article
    }));
  });

  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string>("");
  const [bulkAction, setBulkAction] = useState("");

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Author", accessor: "author" },
    { 
      header: "Date & Status", 
      accessor: (blog: any) => (
        <div className="space-y-1">
          <div>{blog.publishDate}</div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {blog.status}
          </span>
        </div>
      )
    },
  ];

  const handleDelete = (blogId: string) => {
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setBlogs(blogs.filter(blog => blog.id !== blogToDelete));
    toast({
      description: `Article has been deleted successfully.`
    });
    setDeleteDialogOpen(false);
    setBlogToDelete("");
    setSelectedBlogs(selectedBlogs.filter(id => id !== blogToDelete));
  };

  const handleShare = async (blogId: string) => {
    try {
      const url = `${window.location.origin}/blog/${blogId}`;
      await navigator.clipboard.writeText(url);
      toast({
        description: "Article link copied to clipboard!"
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
      setBlogs(blogs.filter(blog => !selectedBlogs.includes(blog.id)));
      toast({
        description: `${selectedBlogs.length} articles have been deleted.`
      });
      setSelectedBlogs([]);
    } else if (bulkAction === 'export') {
      const selectedBlogData = blogs.filter(blog => selectedBlogs.includes(blog.id));
      console.log('Exporting:', selectedBlogData);
      toast({
        description: 'Articles exported successfully.'
      });
    } else if (bulkAction === 'publish') {
      setBlogs(blogs.map(blog => 
        selectedBlogs.includes(blog.id) ? { ...blog, status: 'published' } : blog
      ));
      toast({
        description: `${selectedBlogs.length} articles have been published.`
      });
      setSelectedBlogs([]);
    } else if (bulkAction === 'draft') {
      setBlogs(blogs.map(blog => 
        selectedBlogs.includes(blog.id) ? { ...blog, status: 'draft' } : blog
      ));
      toast({
        description: `${selectedBlogs.length} articles have been moved to draft.`
      });
      setSelectedBlogs([]);
    }
    setBulkAction("");
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = authorFilter === 'all' || blog.author === authorFilter;
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
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
    navigate(`/articles/${id}/edit`);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Our Articles</h1>
        <Link to="/articles/create">
          <Button size="default" className="bg-purple-600 hover:bg-purple-700 px-3 md:px-4">
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setFilterModalOpen(true)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        authorFilter={authorFilter}
        setAuthorFilter={setAuthorFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueAuthors={uniqueAuthors}
      />

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
          CardComponent={BlogCard}
          showCheckboxes={true}
        />

        {selectedBlogs.length > 0 && (
          <BulkActions
            selectedCount={selectedBlogs.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={bulkActions}
          />
        )}
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
              This action cannot be undone. This will permanently delete the article
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
