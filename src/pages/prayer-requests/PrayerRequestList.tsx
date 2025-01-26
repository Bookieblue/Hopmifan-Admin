import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Filter } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { FilterModal } from "@/components/prayer-requests/FilterModal";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BulkActions } from "@/components/shared/BulkActions";
import { ViewDetailsButton } from "@/components/shared/ViewDetailsButton";
import { DetailsModal } from "@/components/shared/DetailsModal";
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
  email: string;
  request: string;
  date: string;
  status: string;
  country: string;
}

const samplePrayerRequests: PrayerRequest[] = [
  {
    id: "PR-1",
    name: "John Smith",
    email: "john.smith@example.com",
    request: "Please pray for my upcoming surgery next week. I'm feeling anxious and need strength.",
    date: new Date().toISOString().split('T')[0],
    status: "pending",
    country: "USA"
  },
  {
    id: "PR-2",
    name: "Maria Garcia",
    email: "maria.g@example.com",
    request: "Seeking prayer for my family's unity and peace during difficult times.",
    date: new Date().toISOString().split('T')[0],
    status: "pending",
    country: "Spain"
  },
  {
    id: "PR-3",
    name: "David Wilson",
    email: "david.w@example.com",
    request: "Please pray for my mother's recovery from illness and complete healing.",
    date: new Date().toISOString().split('T')[0],
    status: "pending",
    country: "Canada"
  }
];

export default function PrayerRequestList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [bulkAction, setBulkAction] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(() => {
    const stored = localStorage.getItem('prayerRequests');
    if (!stored || JSON.parse(stored).length === 0) {
      localStorage.setItem('prayerRequests', JSON.stringify(samplePrayerRequests));
      return samplePrayerRequests;
    }
    return JSON.parse(stored);
  });

  // Get unique countries from prayer requests
  const uniqueCountries = Array.from(new Set(prayerRequests.map(request => request.country)));

  const handleDelete = (ids: string[]) => {
    const updatedRequests = prayerRequests.filter(request => !ids.includes(request.id));
    setPrayerRequests(updatedRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(updatedRequests));
    
    toast({
      description: `${ids.length} prayer request(s) deleted successfully`,
    });
    setSelectedItems([]);
    setDeleteDialogOpen(false);
  };

  const handleStatusChange = (id: string) => {
    const updatedRequests = prayerRequests.map(request => {
      if (request.id === id) {
        return {
          ...request,
          status: request.status === 'completed' ? 'pending' : 'completed'
        };
      }
      return request;
    });
    setPrayerRequests(updatedRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(updatedRequests));
    
    toast({
      description: "Prayer request status updated successfully",
    });
  };

  const handleBulkAction = () => {
    if (!selectedItems.length || !bulkAction) return;

    const updatedRequests = prayerRequests.map(request => {
      if (selectedItems.includes(request.id)) {
        switch (bulkAction) {
          case "delete":
            return null;
          case "markPrayed":
            return { ...request, status: "completed" };
          case "markPending":
            return { ...request, status: "pending" };
          default:
            return request;
        }
      }
      return request;
    }).filter((request): request is PrayerRequest => request !== null);

    setPrayerRequests(updatedRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(updatedRequests));

    const actionMessages = {
      delete: "deleted",
      markPrayed: "marked as prayed",
      markPending: "marked as pending"
    };

    toast({
      description: `${selectedItems.length} prayer requests ${actionMessages[bulkAction as keyof typeof actionMessages]} successfully`,
    });

    setSelectedItems([]);
    setBulkAction("");
  };

  const handleViewDetails = (id: string) => {
    const request = prayerRequests.find(r => r.id === id);
    if (request) {
      setSelectedRequest(request);
      setDetailsModalOpen(true);
    }
  };

  const filteredRequests = prayerRequests.filter((request) => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.request.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesDate = !dateFilter || request.date === dateFilter;
    const matchesCountry = countryFilter === "all" || request.country === countryFilter;
    return matchesSearch && matchesStatus && matchesDate && matchesCountry;
  });

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "markPrayed", label: "Mark as Prayed" },
    { value: "markPending", label: "Mark as Pending" }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
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

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search requests..."
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
          data={filteredRequests}
          columns={[
            {
              header: "Name",
              accessor: (request: any) => (
                <div>
                  <div className="font-medium">{request.name}</div>
                  <div className="text-sm text-gray-500">{request.email}</div>
                </div>
              )
            },
            {
              header: "Request",
              accessor: "request",
              className: "max-w-[400px]"
            },
            {
              header: "Date",
              accessor: "date"
            },
            {
              header: "Status",
              accessor: (request: any) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  request.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.status === 'completed' ? 'Prayed' : 'Pending'}
                </span>
              )
            }
          ]}
          selectedItems={selectedItems}
          onSelectItem={(id, checked) => {
            setSelectedItems(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedItems(checked ? filteredRequests.map(r => r.id) : []);
          }}
          getItemId={(item) => item.id}
          showCheckboxes={true}
          CardComponent={({ item }) => (
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.email}</p>
                  <p className="text-sm text-gray-700 mb-2">{item.request}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'completed' ? 'Prayed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          actions={{
            onViewDetails: handleViewDetails
          }}
        />

        {selectedItems.length > 0 && (
          <BulkActions
            selectedCount={selectedItems.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={bulkActions}
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
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        uniqueCountries={uniqueCountries}
      />

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Prayer Request Details"
        data={selectedRequest}
        onStatusChange={() => selectedRequest && handleStatusChange(selectedRequest.id)}
        statusLabels={{
          pending: 'Pending',
          completed: 'Prayed',
          buttonText: 'Mark as Prayed'
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected prayer requests.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(selectedItems)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}