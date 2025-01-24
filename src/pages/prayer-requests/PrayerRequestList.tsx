import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, MoreVertical, Trash2, CheckSquare, XSquare, Filter } from "lucide-react";
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
import { FilterModal } from "@/components/prayer-requests/FilterModal";
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

interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  date: string;
  status: "answered" | "pending";
}

const sampleRequests: PrayerRequest[] = [
  {
    id: "REQ-001",
    name: "John Doe",
    request: "Pray for my family.",
    date: "Mar 15, 2024",
    status: "pending",
  },
  {
    id: "REQ-002",
    name: "Jane Smith",
    request: "Pray for my health.",
    date: "Mar 14, 2024",
    status: "answered",
  },
];

export default function PrayerRequestList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [bulkAction, setBulkAction] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string>("");

  // Initialize requests from localStorage with sample data if empty
  const [requests, setRequests] = useState<PrayerRequest[]>(() => {
    const stored = localStorage.getItem('prayerRequests');
    if (!stored) {
      const requestsObj = sampleRequests.reduce((acc, request) => {
        acc[request.id] = request;
        return acc;
      }, {} as Record<string, PrayerRequest>);
      localStorage.setItem('prayerRequests', JSON.stringify(requestsObj));
      return sampleRequests;
    }
    try {
      const parsedRequests = JSON.parse(stored);
      return Object.values(parsedRequests);
    } catch (error) {
      console.error('Error parsing requests from localStorage:', error);
      return sampleRequests;
    }
  });

  const handleDelete = (id: string) => {
    setRequestToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const updatedRequests = requests.filter(request => request.id !== requestToDelete);
    const requestsObj = updatedRequests.reduce((acc, request) => {
      acc[request.id] = request;
      return acc;
    }, {} as Record<string, PrayerRequest>);
    
    setRequests(updatedRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(requestsObj));
    
    toast({
      description: "Prayer request deleted successfully",
    });
    setDeleteDialogOpen(false);
    setRequestToDelete("");
    setSelectedRequests(selectedRequests.filter(itemId => itemId !== requestToDelete));
  };

  const handleStatusChange = (id: string, newStatus: "answered" | "pending") => {
    const updatedRequests = requests.map(request => {
      if (request.id === id) {
        return { ...request, status: newStatus };
      }
      return request;
    });

    const requestsObj = updatedRequests.reduce((acc, request) => {
      acc[request.id] = request;
      return acc;
    }, {} as Record<string, PrayerRequest>);
    
    setRequests(updatedRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(requestsObj));
    
    toast({
      description: `Prayer request marked as ${newStatus === 'answered' ? 'answered' : 'pending'} successfully`,
    });
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedRequests.length === 0) return;

    const updatedRequests = [...requests];
    
    switch (bulkAction) {
      case "delete":
        const remainingRequests = updatedRequests.filter(
          request => !selectedRequests.includes(request.id)
        );
        setRequests(remainingRequests);
        const requestsObj = remainingRequests.reduce((acc, request) => {
          acc[request.id] = request;
          return acc;
        }, {} as Record<string, PrayerRequest>);
        localStorage.setItem('prayerRequests', JSON.stringify(requestsObj));
        toast({
          description: `${selectedRequests.length} prayer requests deleted successfully`,
        });
        setSelectedRequests([]);
        setBulkAction("");
        return;
    }
    
    const requestsObj = updatedRequests.reduce((acc, request) => {
      acc[request.id] = request;
      return acc;
    }, {} as Record<string, PrayerRequest>);
    
    setRequests(updatedRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(requestsObj));
    setSelectedRequests([]);
    setBulkAction("");
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Prayer Requests</h1>
        <Link 
          to="/prayer-requests/create"
          className="bg-[#695CAE] hover:bg-[#695CAE]/90 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          New Request
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search requests..."
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
          data={filteredRequests}
          columns={[
            { 
              header: "Name", 
              accessor: "name",
              className: "text-[14px]"
            },
            { 
              header: "Request", 
              accessor: "request",
              className: "text-[14px]"
            },
            { 
              header: "Date", 
              accessor: "date",
              className: "text-[14px]"
            },
            {
              header: "Status",
              accessor: (request: PrayerRequest) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  request.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.status}
                </span>
              ),
              className: "text-[14px]"
            },
            {
              header: "Actions",
              accessor: (request: PrayerRequest) => (
                <div className="flex items-center justify-end gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem onClick={() => handleStatusChange(request.id, request.status === 'answered' ? 'pending' : 'answered')}>
                        {request.status === 'answered' ? (
                          <>
                            <XSquare className="h-4 w-4 mr-2" />
                            Mark as Pending
                          </>
                        ) : (
                          <>
                            <CheckSquare className="h-4 w-4 mr-2" />
                            Mark as Answered
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(request.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ),
              className: "text-[14px]"
            }
          ]}
          selectedItems={selectedRequests}
          onSelectItem={(id, checked) => {
            setSelectedRequests(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedRequests(checked ? filteredRequests.map(r => r.id) : []);
          }}
          getItemId={(item) => item.id}
          showCheckboxes={true}
          bulkActions={[
            { value: "delete", label: "Delete Selected" }
          ]}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />

        {selectedRequests.length > 0 && (
          <BulkActions
            selectedCount={selectedRequests.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
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
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the prayer request
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
