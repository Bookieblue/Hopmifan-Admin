import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, MoreVertical, Edit, Trash2, CheckSquare, XSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import { useToast } from "@/hooks/use-toast";
import { FilterModal } from "@/components/sermons/FilterModal";
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

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  status: "published" | "draft";
  youtubeLink?: string;
  content?: string;
  thumbnailUrl?: string;
}

// Sample sermons data
const sampleSermons: Record<string, Sermon> = {
  "SER-001": {
    id: "SER-001",
    title: "The Power of Faith",
    preacher: "Pastor John Smith",
    date: new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    youtubeLink: "https://youtube.com/watch?v=sample1",
    content: "In this powerful sermon, we explore the transformative power of faith in our daily lives. Through biblical examples and contemporary applications, we learn how faith can move mountains and change hearts.",
    thumbnailUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3"
  },
  "SER-002": {
    id: "SER-002",
    title: "Walking in Love",
    preacher: "Pastor Sarah Johnson",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    youtubeLink: "https://youtube.com/watch?v=sample2",
    content: "Discover the true meaning of walking in love as we delve into 1 Corinthians 13. This message explores practical ways to demonstrate Christ-like love in our relationships and community.",
    thumbnailUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65"
  },
  "SER-003": {
    id: "SER-003",
    title: "Finding Peace in Troubled Times",
    preacher: "Pastor Michael Brown",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "draft",
    youtubeLink: "https://youtube.com/watch?v=sample3",
    content: "A timely message about finding and maintaining peace in the midst of life's storms. Drawing from Scripture, we learn how to anchor our souls in God's promises.",
    thumbnailUrl: "https://images.unsplash.com/photo-1504681869696-d977211a5f4c"
  },
  "SER-004": {
    id: "SER-004",
    title: "The Grace of Giving",
    preacher: "Pastor Rachel Williams",
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    youtubeLink: "https://youtube.com/watch?v=sample4",
    content: "Explore the biblical principles of generosity and the blessings that come from cheerful giving. This sermon unpacks 2 Corinthians 9:6-7 and its application in our lives.",
    thumbnailUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94"
  },
  "SER-005": {
    id: "SER-005",
    title: "Spiritual Warfare",
    preacher: "Pastor David Wilson",
    date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "draft",
    youtubeLink: "https://youtube.com/watch?v=sample5",
    content: "An in-depth look at Ephesians 6 and the armor of God. Learn how to stand firm in your faith and overcome spiritual battles through prayer and God's Word.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
  }
};

export default function SermonList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedSermons, setSelectedSermons] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [bulkAction, setBulkAction] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<string>("");

  // Initialize sermons from localStorage with sample data if empty
  const [sermons, setSermons] = useState<Sermon[]>(() => {
    const stored = localStorage.getItem('sermons');
    if (!stored) {
      localStorage.setItem('sermons', JSON.stringify(sampleSermons));
      return Object.values(sampleSermons);
    }
    try {
      const parsedSermons = JSON.parse(stored);
      return Object.values(parsedSermons);
    } catch (error) {
      console.error('Error parsing sermons from localStorage:', error);
      return Object.values(sampleSermons);
    }
  });

  const handleDelete = (id: string) => {
    setSermonToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const stored = localStorage.getItem('sermons');
    if (stored) {
      const sermons = JSON.parse(stored);
      delete sermons[sermonToDelete];
      localStorage.setItem('sermons', JSON.stringify(sermons));
      setSermons(Object.values(sermons));
      
      toast({
        description: "Sermon deleted successfully",
      });
    }
    setDeleteDialogOpen(false);
    setSermonToDelete("");
    setSelectedSermons(selectedSermons.filter(itemId => itemId !== sermonToDelete));
  };

  const handleStatusChange = (id: string, newStatus: "published" | "draft") => {
    const stored = localStorage.getItem('sermons');
    if (stored) {
      const sermons = JSON.parse(stored);
      if (sermons[id]) {
        sermons[id].status = newStatus;
        localStorage.setItem('sermons', JSON.stringify(sermons));
        setSermons(Object.values(sermons));
        
        toast({
          description: `Sermon ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`,
        });
      }
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedSermons.length === 0) return;

    const stored = localStorage.getItem('sermons');
    if (!stored) return;

    const sermons = JSON.parse(stored);
    
    switch (bulkAction) {
      case "publish":
      case "unpublish":
        selectedSermons.forEach(id => {
          if (sermons[id]) {
            sermons[id].status = bulkAction === "publish" ? "published" : "draft";
          }
        });
        break;
      case "delete":
        selectedSermons.forEach(id => {
          delete sermons[id];
        });
        break;
    }
    
    localStorage.setItem('sermons', JSON.stringify(sermons));
    setSermons(Object.values(sermons));
    setSelectedSermons([]);
    setBulkAction("");
    
    toast({
      description: `${selectedSermons.length} sermons ${
        bulkAction === "publish" 
          ? "published" 
          : bulkAction === "unpublish" 
          ? "unpublished" 
          : "deleted"
      } successfully`,
    });
  };

  const handleRowClick = (id: string) => {
    navigate(`/sermons/${id}/edit`);
  };

  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || sermon.status === statusFilter;
    const matchesDate = !dateFilter || sermon.date.includes(dateFilter);
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sermons</h1>
        <Link 
          to="/sermons/create"
          className="bg-[#695CAE] hover:bg-[#695CAE]/90 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          New Sermon
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search sermons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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

      <div className="bg-white rounded-lg border">
        <DataTable<Sermon>
          data={filteredSermons}
          columns={[
            { 
              header: "Title", 
              accessor: "title",
              className: "text-[14px]"
            },
            { 
              header: "Preacher", 
              accessor: "preacher",
              className: "text-[14px]"
            },
            { 
              header: "Date & Status", 
              accessor: (sermon) => (
                <div className="space-y-1 text-[14px]">
                  <div>{sermon.date}</div>
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
              accessor: (sermon) => (
                <div className="flex items-center justify-end gap-2 text-[14px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(sermon.id);
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(sermon.id, sermon.status === 'published' ? 'draft' : 'published');
                        }}
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
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(sermon.id);
                        }}
                        className="text-red-600"
                      >
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
            setSelectedSermons(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedSermons(checked ? filteredSermons.map(s => s.id) : []);
          }}
          getItemId={(item) => item.id}
          onRowClick={handleRowClick}
          showCheckboxes={true}
          bulkActions={[
            { value: "publish", label: "Publish Selected" },
            { value: "unpublish", label: "Unpublish Selected" },
            { value: "delete", label: "Delete Selected" }
          ]}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />
        {selectedSermons.length > 0 && (
          <BulkActions
            selectedCount={selectedSermons.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "publish", label: "Publish Selected" },
              { value: "unpublish", label: "Unpublish Selected" },
              { value: "delete", label: "Delete Selected" }
            ]}
          />
        )}
      </div>

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

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
}
