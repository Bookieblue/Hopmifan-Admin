<lov-code>
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/blog/BlogCard";
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
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string>("");
  const [bulkAction, setBulkAction] = useState("");
  const postsPerPage = 15;

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
    const storedArticles = JSON.parse(localStorage.getItem('articles') || '{}');
    delete storedArticles[blogToDelete];
    localStorage.setItem('articles', JSON.stringify(storedArticles));
    
    toast({
      description: "Article has been deleted successfully."
    });
    setDeleteDialogOpen(false);
    setBlogToDelete("");
    setSelectedBlogs(selectedBlogs.filter(id => id !== blogToDelete));
    window.location.reload();
  };

  const handleShare = async (blogId: string) => {
    try {
      const url = `${window.location.origin}/articles/${blogId}`;
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
    const storedArticles = JSON.parse(localStorage.getItem('articles') || '{}');
    
    if (bulkAction === 'delete') {
      selectedBlogs.forEach(id => {
        delete storedArticles[id];
      });
      localStorage.setItem('articles', JSON.stringify(storedArticles));
      toast({
        description: `${selectedBlogs.length} articles have been deleted.`
      });
      setSelectedBlogs([]);
      window.location.reload();
    } else if (bulkAction === 'publish') {
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
      window.location.reload();
    } else if (bulkAction === 'draft') {
      selectedBlogs.forEach(id => {
        if (storedArticles[id]) {
          storedArticles[id].status = 'draft';
        }
      });
      localStorage.setItem('articles', JSON.stringify(storedArticles));
      toast({
        description: `${selectedBlogs.length} articles have been moved to draft.`
      });
      setSelectedBlogs([]);
      window.location.reload();
    }
    setBulkAction("");
  };

  const handleRowClick = (id: string) => {
    navigate(`/articles/${id}/edit`);
  };

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "publish", label: "Publish Selected" },
    { value: "draft", label: "Move to Draft" },
  ];

  const filteredBlogs = Object.entries(sampleArticles).map(([id, article]) => ({
    id,
    ...article
  }));

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link to="/articles/create">
          <Button className="bg-purple-600 hover:bg-purple-700">
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
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable
          data={filteredBlogs}
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
              setSelectedBlogs(filteredBlogs.map(blog => blog.id));
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
      </div>

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
