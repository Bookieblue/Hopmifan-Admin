import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { FilterModal } from "@/components/blog/FilterModal";
import { BulkActions } from "@/components/shared/BulkActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const BlogList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string>("");
  const [bulkAction, setBulkAction] = useState("");
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

  const handleStatusChange = (id: string, newStatus: string) => {
    setBlogs(blogs.map(blog => 
      blog.id === id ? { ...blog, status: newStatus } : blog
    ));
    
    const storedArticles = JSON.parse(localStorage.getItem('articles') || '{}');
    if (storedArticles[id]) {
      storedArticles[id].status = newStatus;
      localStorage.setItem('articles', JSON.stringify(storedArticles));
    }
    
    toast({
      description: `Article ${newStatus === 'published' ? 'published' : 'unpublished'} successfully.`
    });
  };

  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      const updatedBlogs = blogs.filter(blog => !selectedBlogs.includes(blog.id));
      setBlogs(updatedBlogs);
      
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '{}');
      selectedBlogs.forEach(id => delete storedArticles[id]);
      localStorage.setItem('articles', JSON.stringify(storedArticles));
      
      toast({
        description: `${selectedBlogs.length} articles have been deleted.`
      });
      setSelectedBlogs([]);
    } else if (bulkAction === 'publish') {
      const updatedBlogs = blogs.map(blog => 
        selectedBlogs.includes(blog.id) ? { ...blog, status: 'published' } : blog
      );
      setBlogs(updatedBlogs);
      
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '{}');
      selectedBlogs.forEach(id => {
        if (storedArticles[id]) {
          storedArticles[id].status = 'published';
        }
      });
      localStorage.setItem('articles', JSON.stringify(storedArticles));
      
      toast({
        description: `${selectedBlogs.length} articles have been published.`
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
        <Link 
          to="/articles/create"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-brand text-white hover:bg-brand/90 h-10 px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          New Article
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
          columns={[
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
            {
              header: "Actions",
              accessor: (blog: any) => (
                <div className="flex items-center justify-end gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] bg-white">
                      <DropdownMenuItem onClick={() => navigate(`/articles/${blog.id}/edit`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/articles/${blog.id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(blog.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ),
              className: "w-[100px]"
            }
          ]}
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
            onStatusChange: handleStatusChange,
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
};

export default BlogList;
