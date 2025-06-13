import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DataTable } from '@/components/shared/DataTable';
import {
  Filter,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  CheckSquare,
  XSquare,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { FilterModal } from '@/components/blog/FilterModal';
import { BulkActions } from '@/components/shared/BulkActions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { BlogCard } from '@/components/blog/BlogCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// const sampleArticles = {
//   "ART-001": {
//     title: "The Future of Web Development: AI and Machine Learning",
//     content: "<p>Artificial Intelligence and Machine Learning are revolutionizing how we build and maintain web applications. This article explores the latest trends and their impact on developers.</p>",
//     author: "Sarah Johnson",
//     publishDate: new Date(2024, 2, 15).toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     }),
//     status: "published",
//     imagePreview: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
//   },
//   "ART-002": {
//     title: "Building Scalable React Applications",
//     content: "<p>Learn the best practices for building large-scale React applications that can handle growing user bases and complex features.</p>",
//     author: "Michael Chen",
//     publishDate: new Date(2024, 2, 14).toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     }),
//     status: "published",
//     imagePreview: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
//   },
//   "ART-003": {
//     title: "The Rise of TypeScript in Modern Development",
//     content: "<p>TypeScript has become an essential tool in modern web development. Discover why more developers are choosing TypeScript and how it improves code quality.</p>",
//     author: "Emily Rodriguez",
//     publishDate: new Date(2024, 2, 13).toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     }),
//     status: "draft",
//     imagePreview: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
//   },
//   "ART-004": {
//     title: "Mastering CSS Grid and Flexbox",
//     content: "<p>A comprehensive guide to modern CSS layout techniques using Grid and Flexbox, with practical examples and best practices.</p>",
//     author: "David Kim",
//     publishDate: new Date(2024, 2, 12).toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     }),
//     status: "published",
//     imagePreview: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
//   },
//   "ART-005": {
//     title: "Introduction to Web Accessibility",
//     content: "<p>Learn why web accessibility is crucial and how to implement WCAG guidelines in your web applications to create inclusive experiences.</p>",
//     author: "Rachel Thompson",
//     publishDate: new Date(2024, 2, 11).toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     }),
//     status: "draft",
//     imagePreview: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
//   }
// };
export const baseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL;
const BlogList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string>('');
  const [bulkAction, setBulkAction] = useState('');
  const postsPerPage = 15;
  const [blogs, setBlogs] = useState([]);
  const queryClient = useQueryClient();
  const [isTakingAction, setIsTakingAction] = useState(false);

  // const [blogs, setBlogs] = useState(() => {
  //   const stored = localStorage.getItem('articles');
  //   if (stored) {
  //     const articles = JSON.parse(stored);
  //     return Object.entries(articles).map(([id, article]: [string, any]) => ({
  //       id,
  //       ...article
  //     }));
  //   }
  //   localStorage.setItem('articles', JSON.stringify(sampleArticles));
  //   return Object.entries(sampleArticles).map(([id, article]) => ({
  //     id,
  //     ...article
  //   }));
  // });

  const getAllArticles = async () => {
    return (await axios.get(`${baseUrl}/api/articles`))?.data?.data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get-articles'],
    queryFn: getAllArticles,
  });

  const articlesData = data?.articles;
  const errorMessage = error?.message;

  const handleDelete = blogId => {
    setBlogToDelete(blogId);
    setDeleteDialogOpen(true);
  };

  // const confirmDelete = () => {
  //   // setBlogs(blogs.filter(blog => blog.id !== blogToDelete));

  //   const storedArticles = JSON.parse(localStorage.getItem('articles') || '{}');
  //   delete storedArticles[blogToDelete];
  //   localStorage.setItem('articles', JSON.stringify(storedArticles));

  //   toast({
  //     description: "Article deleted successfully."
  //   });

  //   setDeleteDialogOpen(false);
  //   setBlogToDelete("");
  //   setSelectedBlogs(selectedBlogs.filter(id => id !== blogToDelete));
  // };

  const handleRowClick = (id: string) => {
    // Only navigate to edit if not clicking delete button
    if (!deleteDialogOpen) {
      navigate(`/articles/${id}/edit`);
    }
  };

  const publishArticle = async payload => {
    return (await axios.post(`${baseUrl}/api/articles/publish`, payload))?.data;
  };
  const unPublishArticle = async payload => {
    return (await axios.post(`${baseUrl}/api/articles/unpublish`, payload))
      ?.data;
  };
  const deleteArticle = async payload => {
    return (await axios.post(`${baseUrl}/api/articles/delete`, payload))?.data;
  };
  const publishArticleMutation = useMutation({
    mutationFn: publishArticle,
    mutationKey: ['publishArticle'],
  });
  const unPublishArticleMutation = useMutation({
    mutationFn: unPublishArticle,
    mutationKey: ['unPublishArticle'],
  });
  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    mutationKey: ['deleteArticle'],
  });

  const handlePublishArticle = async (id: string) => {
    const payload = {
      articleIds: [id],
    };
    try {
      await publishArticleMutation.mutateAsync(payload, {
        onSuccess: data => {
          toast({
            description: data?.message || 'Article published successfully.',
          });
          queryClient.refetchQueries({ queryKey: ['get-articles'] });
        },
      });
    } catch (error) {
      toast({
        description: 'Error publishing article.',
      });
    }
  };

  const handleUnpublishArticle = async (id: string) => {
    const payload = {
      articleIds: [id],
    };
    try {
      await unPublishArticleMutation.mutateAsync(payload, {
        onSuccess: data => {
          toast({
            description: data?.message || 'Article unpublished successfully.',
          });
          queryClient.refetchQueries({ queryKey: ['get-articles'] });
        },
      });
    } catch (error) {
      toast({
        description: "Couldn't unpublish article.",
      });
    }
  };

  const handleDeleteArticle = async (id: string) => {
    const payload = {
      articleIds: [id],
    };
    try {
      await deleteArticleMutation.mutateAsync(payload, {
        onSuccess: data => {
          toast({
            description: data?.message || 'Article deleted successfully.',
          });
          setDeleteDialogOpen(false);
          setBlogToDelete('');
          setSelectedBlogs(selectedBlogs.filter(id => id !== blogToDelete));
          queryClient.refetchQueries({ queryKey: ['get-articles'] });
        },
      });
    } catch (error) {
      toast({
        description: 'Error deleting article.',
      });
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (
      newStatus.toLowerCase() === 'published' ||
      newStatus.toLowerCase() === 'publish'
    ) {
      handlePublishArticle(id);
    } else {
      handleUnpublishArticle(id);
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedBlogs.length === 0) return;
    const payload = {
      articleIds: selectedBlogs,
    };
    setIsTakingAction(true);
    switch (bulkAction) {
      case 'delete':
        // try{
        //   await deleteArticleMutation.mutateAsync(payload, {
        //     onSuccess: (data) => {
        //       toast({
        //         description: data?.message || "Selected articles deleted successfully."
        //       });
        //       setDeleteDialogOpen(false);
        //       setBlogToDelete("");
        //       setSelectedBlogs(selectedBlogs.filter(id => id !== blogToDelete));
        //       queryClient.refetchQueries({queryKey: ['get-articles']})
        //     }
        //   });

        // }
        // catch(error){
        //   toast({
        //     description: error?.response?.data?.message || error?.message || "Error deleting articles."
        //   });
        // }
        handleDelete(payload);
        break;

      case 'publish':
        try {
          await publishArticleMutation.mutateAsync(payload, {
            onSuccess: data => {
              toast({
                description:
                  data?.message || 'Selected articles published successfully..',
              });
              queryClient.refetchQueries({ queryKey: ['get-articles'] });
            },
          });
        } catch (error) {
          toast({
            description:
              error?.response?.data?.message ||
              error?.message ||
              'Error publishing articles.',
          });
        }
        // setBlogs(blogs.map(blog =>
        //   selectedBlogs.includes(blog.id) ? { ...blog, status: 'published' } : blog
        // ));

        // const storedArticlesPublish = JSON.parse(localStorage.getItem('articles') || '{}');
        // selectedBlogs.forEach(id => {
        //   if (storedArticlesPublish[id]) {
        //     storedArticlesPublish[id].status = 'published';
        //   }
        // });
        // localStorage.setItem('articles', JSON.stringify(storedArticlesPublish));

        // toast({
        //   description: "Selected articles published successfully."
        // });
        break;

      case 'draft':
        try {
          await unPublishArticleMutation.mutateAsync(payload, {
            onSuccess: data => {
              toast({
                description:
                  data?.message ||
                  'Selected articles unpublished successfully.',
              });
              queryClient.refetchQueries({ queryKey: ['get-articles'] });
            },
          });
        } catch (error) {
          toast({
            description:
              error?.response?.data?.message ||
              error?.message ||
              "Couldn't unpublish articles.",
          });
        }
        // setBlogs(blogs.map(blog =>
        //   selectedBlogs.includes(blog.id) ? { ...blog, status: 'draft' } : blog
        // ));

        // const storedArticlesDraft = JSON.parse(localStorage.getItem('articles') || '{}');
        // selectedBlogs.forEach(id => {
        //   if (storedArticlesDraft[id]) {
        //     storedArticlesDraft[id].status = 'draft';
        //   }
        // });
        // localStorage.setItem('articles', JSON.stringify(storedArticlesDraft));

        // toast({
        //   description: "Selected articles moved to draft successfully."
        // });
        break;

      case 'download': {
        // Create PDFs and download as zip
        const selectedArticles = blogs.filter(blog =>
          selectedBlogs.includes(blog.id)
        );

        // This would typically be handled by a backend service
        // For now, we'll show a toast to indicate the feature
        toast({
          description: `${selectedArticles.length} articles will be downloaded as PDFs`,
        });
        break;
      }
    }
    setIsTakingAction(false);
    setSelectedBlogs([]);
    setBulkAction('');
  };

  const filteredBlogs = articlesData?.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = authorFilter === '' || blog.author === authorFilter;
    const matchesStatus = statusFilter === '' || blog.status === statusFilter;
    const matchesDate = !dateFilter || blog.datePublished === dateFilter;

    return matchesSearch && matchesAuthor && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredBlogs?.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentBlogs = filteredBlogs?.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const uniqueAuthors = Array.from(
    new Set(articlesData?.map(blog => blog.author))
  );

  const bulkActions = [
    { value: 'delete', label: 'Delete Selected' },
    { value: 'export', label: 'Export as CSV' },
    { value: 'publish', label: 'Publish Selected' },
    { value: 'draft', label: 'Move to Draft' },
    { value: 'download', label: 'Download as PDF' },
  ];

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Our Articles</h1>
        <Link
          to="/articles/create"
          className="bg-[#695CAE] hover:bg-[#695CAE]/90 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2"
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
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setFilterModalOpen(true)}
            className="flex items-center gap-2"
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
        uniqueAuthors={uniqueAuthors as string[]}
      />

      <div className="bg-white md:rounded-lg md:border">
        {isLoading ? (
          <div className="flex justify-center items-center p-6">
            <span className="animate-spin border-4 border-gray-300 border-t-gray-600 rounded-full w-6 h-6"></span>
            <span className="ml-3 text-gray-600">Loading articles...</span>
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 p-6">
            {errorMessage ??
              'Failed to load articles. Please reload this page.'}
          </div>
        ) : (
          <DataTable
            data={articlesData}
            columns={[
              {
                header: 'Title',
                accessor: 'title',
                className: 'text-[14px]',
              },
              {
                header: 'Author',
                accessor: 'author',
                className: 'text-[14px]',
              },
              {
                header: 'Date & Status',
                accessor: blog => (
                  <div className="space-y-1 text-[14px]">
                    <div>
                      {blog?.datePublished
                        ? new Date(blog?.datePublished).toDateString()
                        : 'N/A'}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        blog?.status.toLowerCase() === 'publish'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {blog?.status}
                    </span>
                  </div>
                ),
                className: 'text-[14px]',
              },
              {
                header: 'Actions',
                accessor: blog => (
                  <div
                    className="flex items-center justify-end gap-2 text-[14px]"
                    onClick={e => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-[200px] bg-white"
                      >
                        <DropdownMenuItem
                          onClick={() => {
                            navigate(`/articles/${blog?.id}/edit`);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(
                              blog.id,
                              blog?.status === 'publish' ? 'draft' : 'published'
                            )
                          }
                        >
                          {blog.status === 'publish' ||
                          blog?.status === 'published' ? (
                            <>
                              <XSquare className="h-4 w-4 mr-2" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <CheckSquare className="h-4 w-4 mr-2" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ),
                className: 'w-[100px] text-[14px]',
              },
            ]}
            selectedItems={selectedBlogs}
            onSelectItem={(id, checked) => {
              if (checked) {
                setSelectedBlogs([...selectedBlogs, id]);
              } else {
                setSelectedBlogs(
                  selectedBlogs?.filter(blogId => blogId !== id)
                );
              }
            }}
            onSelectAll={checked => {
              if (checked) {
                setSelectedBlogs(currentBlogs?.map(blog => blog.id));
              } else {
                setSelectedBlogs([]);
              }
            }}
            getItemId={item => item.id}
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
        )}

        {selectedBlogs?.length > 0 && (
          <BulkActions
            selectedCount={selectedBlogs?.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={bulkActions}
            isTakingAction={isTakingAction}
          />
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              article and remove all of its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteArticle(blogToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogList;
