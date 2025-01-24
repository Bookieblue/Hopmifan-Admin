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

const sampleSermons: Sermon[] = [
  {
    id: "SER-001",
    title: "Understanding God's Love",
    preacher: "Pastor John Doe",
    date: "Mar 15, 2024",
    status: "published",
    youtubeLink: "https://youtube.com/watch?v=123",
    content: "A powerful message about God's love...",
    thumbnailUrl: ""
  },
  {
    id: "SER-002",
    title: "Walking in Faith",
    preacher: "Pastor Jane Smith",
    date: "Mar 14, 2024",
    status: "draft",
    content: "Learning to trust God in all circumstances...",
    thumbnailUrl: ""
  },
];

export default function SermonList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedSermons, setSelectedSermons] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [bulkAction, setBulkAction] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState<string>("");
  const navigate = useNavigate();

  const [sermons, setSermons] = useState<Sermon[]>(() => {
    const stored = localStorage.getItem('sermons');
    if (!stored) {
      localStorage.setItem('sermons', JSON.stringify(sampleSermons));
      return sampleSermons;
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing sermons:', error);
      return sampleSermons;
    }
  });

  const handleRowClick = (id: string) => {
    navigate(`/sermons/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    setSermonToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const updatedSermons = sermons.filter(sermon => sermon.id !== sermonToDelete);
    setSermons(updatedSermons);
    localStorage.setItem('sermons', JSON.stringify(updatedSermons));
    
    toast({
      description: "Sermon deleted successfully",
    });
    setDeleteDialogOpen(false);
    setSermonToDelete("");
    setSelectedSermons(selectedSermons.filter(itemId => itemId !== sermonToDelete));
  };

  const handleStatusChange = (id: string, newStatus: "published" | "draft") => {
    const updatedSermons = sermons.map(sermon => {
      if (sermon.id === id) {
        return { ...sermon, status: newStatus };
      }
      return sermon;
    });
    setSermons(updatedSermons);
    localStorage.setItem('sermons', JSON.stringify(updatedSermons));
    
    toast({
      description: `Sermon ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`,
    });
  };

  const handleBulkAction = () => {
    if (!selectedSermons.length || !bulkAction) return;

    const updatedSermons = sermons.map(sermon => {
      if (selectedSermons.includes(sermon.id)) {
        switch (bulkAction) {
          case "delete":
            return null;
          case "publish":
            return { ...sermon, status: "published" };
          case "unpublish":
            return { ...sermon, status: "draft" };
          default:
            return sermon;
        }
      }
      return sermon;
    }).filter(Boolean) as Sermon[];

    setSermons(updatedSermons);
    localStorage.setItem('sermons', JSON.stringify(updatedSermons));

    const actionMessages = {
      delete: "deleted",
      publish: "published",
      unpublish: "unpublished"
    };

    toast({
      description: `${selectedSermons.length} sermons ${actionMessages[bulkAction as keyof typeof actionMessages]} successfully`,
    });

    setSelectedSermons([]);
    setBulkAction("");
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
        <DataTable
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
                      <DropdownMenuItem onClick={() => handleRowClick(sermon.id)}>
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
                      <DropdownMenuItem
                        onClick={() => handleDelete(sermon.id)}
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
