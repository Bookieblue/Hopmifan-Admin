import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterModal } from "@/components/prayer-requests/FilterModal";
import { DetailsModal } from "@/components/shared/DetailsModal";
import { BulkActions } from "@/components/shared/BulkActions";
import { useToast } from "@/hooks/use-toast";

const samplePrayerRequests = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    request: "Please pray for my upcoming surgery next week. I need strength and healing.",
    date: new Date().toLocaleDateString(),
    status: "pending",
    country: "United States"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    request: "Requesting prayers for my family's unity and peace during difficult times.",
    date: new Date().toLocaleDateString(),
    status: "pending",
    country: "Canada"
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.c@example.com",
    request: "Please pray for my mother's recovery from illness. She needs complete healing.",
    date: new Date().toLocaleDateString(),
    status: "pending",
    country: "Singapore"
  }
];

export default function PrayerRequestList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [bulkAction, setBulkAction] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Initialize prayer requests from localStorage or use sample data
  const [prayerRequests, setPrayerRequests] = useState(() => {
    try {
      const stored = localStorage.getItem('prayerRequests');
      if (!stored) {
        localStorage.setItem('prayerRequests', JSON.stringify(samplePrayerRequests));
        return samplePrayerRequests;
      }
      const parsedData = JSON.parse(stored);
      if (!parsedData || parsedData.length === 0) {
        localStorage.setItem('prayerRequests', JSON.stringify(samplePrayerRequests));
        return samplePrayerRequests;
      }
      return parsedData;
    } catch (error) {
      console.error('Error loading prayer requests:', error);
      return samplePrayerRequests;
    }
  });

  const columns = [
    {
      header: "Name & Email",
      accessor: (request: any) => (
        <div>
          <div className="font-medium">{request.name}</div>
          <div className="text-sm text-gray-500">{request.email}</div>
        </div>
      )
    },
    {
      header: "Request",
      accessor: (request: any) => (
        <div className="max-w-[400px] truncate">
          {request.request}
        </div>
      )
    },
    {
      header: "Status & Date",
      accessor: (request: any) => (
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            request.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {request.status === 'completed' ? 'Prayed' : 'Pending'}
          </span>
          <div className="text-sm text-gray-500 mt-1">{request.date}</div>
        </div>
      )
    }
  ];

  const handleViewDetails = (id: string) => {
    const request = prayerRequests.find(r => r.id === id);
    if (request) {
      setSelectedRequest(request);
      setDetailsModalOpen(true);
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedRequest) {
      const updatedRequests = prayerRequests.map(request =>
        request.id === selectedRequest.id ? { ...request, status } : request
      );
      setPrayerRequests(updatedRequests);
      localStorage.setItem('prayerRequests', JSON.stringify(updatedRequests));
      setDetailsModalOpen(false);
      toast({
        description: "Prayer request status updated successfully",
      });
    }
  };

  const handleBulkAction = () => {
    if (!selectedItems.length || !bulkAction) return;

    const updatedRequests = prayerRequests.map(request => {
      if (selectedItems.includes(request.id)) {
        return {
          ...request,
          status: bulkAction === 'markPrayed' ? 'completed' : 'pending'
        };
      }
      return request;
    });

    setPrayerRequests(updatedRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(updatedRequests));
    
    toast({
      description: `${selectedItems.length} prayer requests updated successfully`,
    });
    
    setSelectedItems([]);
    setBulkAction("");
  };

  const filteredRequests = prayerRequests.filter((request) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (request?.name?.toLowerCase() || '').includes(searchLower) ||
      (request?.email?.toLowerCase() || '').includes(searchLower) ||
      (request?.request?.toLowerCase() || '').includes(searchLower);
    const matchesStatus = statusFilter === "all" || request?.status === statusFilter;
    const matchesDate = !dateFilter || request?.date === dateFilter;
    const matchesCountry = countryFilter === "all" || request?.country === countryFilter;
    return matchesSearch && matchesStatus && matchesDate && matchesCountry;
  });

  return (
    <div className="mobile-spacing">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Prayer Requests</h1>
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

      <div className="bg-white md:rounded-lg md:border overflow-hidden">
        <DataTable
          data={filteredRequests}
          columns={columns}
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
          onRowClick={handleViewDetails}
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
        />

        {selectedItems.length > 0 && (
          <BulkActions
            selectedCount={selectedItems.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "markPrayed", label: "Mark as Prayed" },
              { value: "markPending", label: "Mark as Pending" }
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
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        uniqueCountries={Array.from(new Set(prayerRequests.map(request => request.country)))}
      />

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Prayer Request Details"
        data={selectedRequest}
        onStatusChange={handleStatusChange}
        statusLabels={{
          pending: 'Pending',
          completed: 'Prayed',
          buttonText: 'Mark as Prayed'
        }}
      />
    </div>
  );
}