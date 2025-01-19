import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
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
    title: "Walking in Faith",
    content: "<p>A powerful message about walking in faith and trusting God's plan for our lives.</p>",
    preacher: "Pastor John Smith",
    date: new Date(2024, 2, 15).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    youtubeLink: "https://youtube.com/watch?v=example1"
  },
  "SER-002": {
    title: "The Power of Prayer",
    content: "<p>Understanding the importance and impact of prayer in our daily lives.</p>",
    preacher: "Pastor Sarah Johnson",
    date: new Date(2024, 2, 14).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: "published",
    youtubeLink: "https://youtube.com/watch?v=example2"
  }
};

export default function SermonList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [preacherFilter, setPreacherFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const postsPerPage = 15;
  
  const [sermons, setSermons] = useState(() => {
    const stored = localStorage.getItem('sermons');
    if (stored) {
      const items = JSON.parse(stored);
      return Object.entries(items).map(([id, sermon]: [string, any]) => ({
        id,
        ...sermon
      }));
    }
    localStorage.setItem('sermons', JSON.stringify(sampleSermons));
    return Object.entries(sampleSermons).map(([id, sermon]) => ({
      id,
      ...sermon
    }));
  });

  const [selectedSermons, setSelectedSermons] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<string>("");
  const [bulkAction, setBulkAction] = useState("");

  const handleDelete = (sermonId: string) => {
    setSermonToDelete(sermonId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setSermons(sermons.filter(sermon => sermon.id !== sermonToDelete));
    toast({
      description: `Sermon has been deleted successfully.`
    });
    setDeleteDialogOpen(false);
    setSermonToDelete("");
    setSelectedSermons(selectedSermons.filter(id => id !== sermonToDelete));
  };

  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      setSermons(sermons.filter(sermon => !selectedSermons.includes(sermon.id)));
      toast({
        description: `${selectedSermons.length} sermons have been deleted.`
      });
      setSelectedSermons([]);
    } else if (bulkAction === 'publish') {
      setSermons(sermons.map(sermon => 
        selectedSermons.includes(sermon.id) ? { ...sermon, status: 'published' } : sermon
      ));
      toast({
        description: `${selectedSermons.length} sermons have been published.`
      });
      setSelectedSermons([]);
    } else if (bulkAction === 'draft') {
      setSermons(sermons.map(sermon => 
        selectedSermons.includes(sermon.id) ? { ...sermon, status: 'draft' } : sermon
      ));
      toast({
        description: `${selectedSermons.length} sermons have been moved to draft.`
      });
      setSelectedSermons([]);
    }
    setBulkAction("");
  };

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPreacher = preacherFilter === 'all' || sermon.preacher === preacherFilter;
    const matchesStatus = statusFilter === 'all' || sermon.status === statusFilter;
    const matchesDate = !dateFilter || sermon.date === dateFilter;
    
    return matchesSearch && matchesPreacher && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredSermons.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentSermons = filteredSermons.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "publish", label: "Publish Selected" },
    { value: "draft", label: "Move to Draft" },
  ];

  const handleRowClick = (id: string) => {
    navigate(`/sermons/${id}/edit`);
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Preacher", accessor: "preacher" },
    { 
      header: "Date & Status", 
      accessor: (sermon: any) => (
        <div className="space-y-1">
          <div>{sermon.date}</div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            sermon.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {sermon.status}
          </span>
        </div>
      )
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Sermons</h1>
        <Link to="/sermons/create">
          <Button size="default" className="bg-purple-600 hover:bg-purple-700 px-3 md:px-4">
            <Plus className="h-4 w-4 mr-2" />
            New Sermon
          </Button>
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
            className="flex items-center gap-2"
            onClick={() => setFilterModalOpen(true)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={currentSermons}
          columns={columns}
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
          }}
          bulkActions={bulkActions}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
          onRowClick={handleRowClick}
          CardComponent={SermonCard}
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
