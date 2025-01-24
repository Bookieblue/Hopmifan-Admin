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
import { SermonCard } from "@/components/sermons/SermonCard";

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

  // Initialize sermons from localStorage
  const [sermons, setSermons] = useState<Sermon[]>(() => {
    try {
      const stored = localStorage.getItem('sermons');
      if (stored) {
        console.log('Found sermons in localStorage:', stored);
        const parsedSermons = JSON.parse(stored);
        return Object.values(parsedSermons);
      }
      console.log('No sermons in localStorage');
      return [];
    } catch (error) {
      console.error('Error parsing sermons from localStorage:', error);
      return [];
    }
  });

  const handleDelete = (id: string) => {
    setSermonToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    try {
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
    } catch (error) {
      console.error('Error deleting sermon:', error);
      toast({
        variant: "destructive",
        description: "Error deleting sermon",
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
          CardComponent={SermonCard}
          actions={{
            onDelete: handleDelete,
            onStatusChange: (id, status) => handleStatusChange(id, status as "published" | "draft")
          }}
          bulkActions={[
            { value: "publish", label: "Publish Selected" },
            { value: "unpublish", label: "Unpublish Selected" },
            { value: "delete", label: "Delete Selected" }
          ]}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />
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