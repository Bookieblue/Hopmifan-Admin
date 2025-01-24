import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { Filter, Plus, Search, MoreVertical, Edit, Trash2, CheckSquare, XSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { FilterModal } from "@/components/sermons/FilterModal";
import { BulkActions } from "@/components/shared/BulkActions";
import { Button } from "@/components/ui/button";
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
import { SermonCard } from "@/components/sermons/SermonCard";

const sampleSermons = {
  "SER-001": {
    title: "The Power of Faith in Modern Times",
    content: "<p>Exploring how faith remains a vital force in our contemporary world, providing guidance and strength in facing modern challenges.</p>",
    author: "Pastor John Smith",
    publishDate: new Date(2024, 0, 20).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    imagePreview: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
  },
  "SER-002": {
    title: "Understanding God's Grace",
    content: "<p>A deep dive into the concept of divine grace and its transformative power in our lives.</p>",
    author: "Rev. Sarah Johnson",
    publishDate: new Date(2024, 0, 19).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    imagePreview: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
  },
  "SER-003": {
    title: "Walking in Love: A Christian's Journey",
    content: "<p>Examining the practical application of love in our daily lives through biblical teachings and modern examples.</p>",
    author: "Pastor Michael Brown",
    publishDate: new Date(2024, 0, 18).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    imagePreview: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a"
  },
  "SER-004": {
    title: "Finding Peace in Troubled Times",
    content: "<p>Discovering spiritual peace and maintaining faith during periods of uncertainty and challenge.</p>",
    author: "Rev. Emily Davis",
    publishDate: new Date(2024, 0, 17).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "draft",
    imagePreview: "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f"
  },
  "SER-005": {
    title: "The Purpose of Prayer",
    content: "<p>Understanding the power and importance of prayer in building a stronger relationship with God.</p>",
    author: "Pastor David Wilson",
    publishDate: new Date(2024, 0, 16).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    imagePreview: "https://images.unsplash.com/photo-1455849318743-b2233052fcff"
  }
};

const SermonList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedSermons, setSelectedSermons] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<string>("");
  const [bulkAction, setBulkAction] = useState("");
  const postsPerPage = 15;
  
  const [sermons, setSermons] = useState(() => {
    const stored = localStorage.getItem('sermons');
    if (stored) {
      const sermonsData = JSON.parse(stored);
      return Object.entries(sermonsData).map(([id, sermon]: [string, any]) => ({
        id,
        ...sermon
      }));
    }
    // If no sermons exist in localStorage, initialize with sample data
    localStorage.setItem('sermons', JSON.stringify(sampleSermons));
    return Object.entries(sampleSermons).map(([id, sermon]) => ({
      id,
      ...sermon
    }));
  });

  const handleDelete = (sermonId: string) => {
    setSermonToDelete(sermonId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setSermons(sermons.filter(sermon => sermon.id !== sermonToDelete));
    
    const storedSermons = JSON.parse(localStorage.getItem('sermons') || '{}');
    delete storedSermons[sermonToDelete];
    localStorage.setItem('sermons', JSON.stringify(storedSermons));
    
    toast({
      description: "Sermon deleted successfully."
    });
    
    setDeleteDialogOpen(false);
    setSermonToDelete("");
    setSelectedSermons(selectedSermons.filter(id => id !== sermonToDelete));
  };

  const handleRowClick = (id: string) => {
    if (!deleteDialogOpen) {
      navigate(`/sermons/${id}/edit`);
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setSermons(sermons.map(sermon => 
      sermon.id === id ? { ...sermon, status: newStatus } : sermon
    ));
    
    const storedSermons = JSON.parse(localStorage.getItem('sermons') || '{}');
    if (storedSermons[id]) {
      storedSermons[id].status = newStatus;
      localStorage.setItem('sermons', JSON.stringify(storedSermons));
    }
    
    toast({
      description: `Sermon ${newStatus === 'published' ? 'published' : 'unpublished'} successfully.`
    });
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedSermons.length === 0) return;

    switch (bulkAction) {
      case "delete":
        const updatedSermons = sermons.filter(sermon => !selectedSermons.includes(sermon.id));
        setSermons(updatedSermons);
        
        const storedSermons = JSON.parse(localStorage.getItem('sermons') || '{}');
        selectedSermons.forEach(id => delete storedSermons[id]);
        localStorage.setItem('sermons', JSON.stringify(storedSermons));
        
        toast({
          description: "Selected sermons deleted successfully."
        });
        break;
      
      case "publish":
        setSermons(sermons.map(sermon => 
          selectedSermons.includes(sermon.id) ? { ...sermon, status: 'published' } : sermon
        ));
        
        const storedSermonsPublish = JSON.parse(localStorage.getItem('sermons') || '{}');
        selectedSermons.forEach(id => {
          if (storedSermonsPublish[id]) {
            storedSermonsPublish[id].status = 'published';
          }
        });
        localStorage.setItem('sermons', JSON.stringify(storedSermonsPublish));
        
        toast({
          description: "Selected sermons published successfully."
        });
        break;
      
      case "draft":
        setSermons(sermons.map(sermon => 
          selectedSermons.includes(sermon.id) ? { ...sermon, status: 'draft' } : sermon
        ));
        
        const storedSermonsDraft = JSON.parse(localStorage.getItem('sermons') || '{}');
        selectedSermons.forEach(id => {
          if (storedSermonsDraft[id]) {
            storedSermonsDraft[id].status = 'draft';
          }
        });
        localStorage.setItem('sermons', JSON.stringify(storedSermonsDraft));
        
        toast({
          description: "Selected sermons moved to draft successfully."
        });
        break;
    }
    
    setSelectedSermons([]);
    setBulkAction("");
  };

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sermon.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = authorFilter === 'all' || sermon.author === authorFilter;
    const matchesStatus = statusFilter === 'all' || sermon.status === statusFilter;
    const matchesDate = !dateFilter || sermon.publishDate === dateFilter;
    
    return matchesSearch && matchesAuthor && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredSermons.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentSermons = filteredSermons.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const uniqueAuthors = Array.from(new Set(sermons.map(sermon => sermon.author)));

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "publish", label: "Publish Selected" },
    { value: "draft", label: "Move to Draft" }
  ];

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Our Sermons</h1>
        <Link 
          to="/sermons/create"
          className="bg-[#695CAE] hover:bg-[#695CAE]/90 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          New Sermon
        </Link>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search sermons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        uniqueAuthors={uniqueAuthors}
      />

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={currentSermons}
          columns={[
            { 
              header: "Title", 
              accessor: "title",
              className: "text-[14px]"
            },
            { 
              header: "Author", 
              accessor: "author",
              className: "text-[14px]"
            },
            { 
              header: "Date & Status", 
              accessor: (sermon: any) => (
                <div className="space-y-1 text-[14px]">
                  <div>{sermon.publishDate}</div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sermon.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {sermon.status}
                  </span>
                </div>
              ),
              className: "text-[14px]"
            },
            {
              header: "Actions",
              accessor: (sermon: any) => (
                <div className="flex items-center justify-end gap-2 text-[14px]" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] bg-white">
                      <DropdownMenuItem onClick={() => navigate(`/sermons/${sermon.id}/edit`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(sermon.id, sermon.status === 'published' ? 'draft' : 'published')}
                      >
                        {sermon.status === 'published' ? (
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
                      <DropdownMenuItem onClick={() => handleDelete(sermon.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ),
              className: "w-[100px] text-[14px]"
            }
          ]}
          selectedItems={selectedSermons}
          onSelectItem={(id, checked) => {
            if (checked) {
              setSelectedSermons([...selectedSermons, id]);
            } else {
              setSelectedSermons(selectedSermons.filter(sermonId => sermonId !== id));
            }
          }}
          onSelectAll={(checked) => {
            if (checked) {
              setSelectedSermons(currentSermons.map(sermon => sermon.id));
            } else {
              setSelectedSermons([]);
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
          CardComponent={SermonCard}
          showCheckboxes={true}
        />

        {selectedSermons.length > 0 && (
          <BulkActions
            selectedCount={selectedSermons.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={bulkActions}
          />
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the sermon
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

export default SermonList;
