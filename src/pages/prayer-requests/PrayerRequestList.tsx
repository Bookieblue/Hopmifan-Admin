import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { FilterModal } from "@/components/prayer-requests/FilterModal";
import { DetailsModal } from "@/components/shared/DetailsModal";
import { BulkActions } from "@/components/shared/BulkActions";
import { useToast } from "@/hooks/use-toast";

export default function PrayerRequestList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [requests, setRequests] = useState([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      description: "Pray for healing",
      status: "pending",
      date: "2024-01-15",
      message: "Please pray for my complete healing and recovery.",
      country: "USA"
    },
  ]);

  // Get unique countries from requests
  const uniqueCountries = Array.from(new Set(requests.map(request => request.country)));

  const handleViewDetails = (id: string) => {
    const request = requests.find(r => r.id === id);
    if (request) {
      setSelectedRequest(request);
      setDetailsModalOpen(true);
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedRequest) {
      setRequests(requests.map(request => 
        request.id === selectedRequest.id 
          ? { ...request, status }
          : request
      ));
      setDetailsModalOpen(false);
      toast({
        description: `Prayer request marked as ${status}`,
      });
    }
  };

  const columns = [
    { 
      header: "Name", 
      accessor: (request: any) => (
        <div>
          <div className="font-medium">{`${request.firstName} ${request.lastName}`}</div>
          <div className="text-sm text-gray-500">{request.email}</div>
        </div>
      )
    },
    { 
      header: "Contact Info", 
      accessor: (request: any) => (
        <div>
          <div>{request.phone}</div>
          <div className="text-sm text-gray-500">{request.country}</div>
        </div>
      )
    },
    { 
      header: "Location", 
      accessor: (request: any) => (
        <div>
          <div>{request.country}</div>
          <div className="text-sm text-gray-500">{request.cityState || 'N/A'}</div>
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
    },
    {
      header: "Actions",
      accessor: (request: any) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(request.id);
            }}
            className="text-[#9b87f5] text-sm hover:underline"
          >
            See details
          </button>
        </div>
      )
    }
  ];

  const handleBulkAction = () => {
    if (!bulkAction || selectedRequests.length === 0) return;

    const updatedRequests = [...requests];
    
    switch (bulkAction) {
      case "markPrayed":
        selectedRequests.forEach(id => {
          const requestIndex = updatedRequests.findIndex(r => r.id === id);
          if (requestIndex !== -1) {
            updatedRequests[requestIndex] = {
              ...updatedRequests[requestIndex],
              status: "completed"
            };
          }
        });
        toast({
          description: `${selectedRequests.length} requests marked as prayed`,
        });
        break;
      case "markPending":
        selectedRequests.forEach(id => {
          const requestIndex = updatedRequests.findIndex(r => r.id === id);
          if (requestIndex !== -1) {
            updatedRequests[requestIndex] = {
              ...updatedRequests[requestIndex],
              status: "pending"
            };
          }
        });
        toast({
          description: `${selectedRequests.length} requests marked as pending`,
        });
        break;
      case "delete":
        const newRequests = updatedRequests.filter(
          request => !selectedRequests.includes(request.id)
        );
        setRequests(newRequests);
        toast({
          description: `${selectedRequests.length} requests deleted`,
        });
        break;
    }
    
    if (bulkAction !== "delete") {
      setRequests(updatedRequests);
    }
    setSelectedRequests([]);
    setBulkAction("");
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Prayer Requests</h1>
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
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable
          data={requests}
          columns={columns}
          selectedItems={selectedRequests}
          onSelectItem={(id, checked) => {
            setSelectedRequests(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedRequests(checked ? requests.map(r => r.id) : []);
          }}
          getItemId={(item) => item.id}
          onRowClick={(id) => handleViewDetails(id)}
          showCheckboxes={true}
          actions={{
            onViewDetails: handleViewDetails
          }}
          CardComponent={({ item }) => (
            <div className="p-4 border-b last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{`${item.firstName} ${item.lastName}`}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'completed' ? 'Prayed' : 'Pending'}
                </span>
              </div>
              <p className="text-sm mb-2">{item.description}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          )}
        />

        {selectedRequests.length > 0 && (
          <BulkActions
            selectedCount={selectedRequests.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "markPrayed", label: "Mark as Prayed" },
              { value: "markPending", label: "Mark as Pending" },
              { value: "delete", label: "Delete Selected" }
            ]}
          />
        )}
      </div>

      <FilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueCountries={uniqueCountries}
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
