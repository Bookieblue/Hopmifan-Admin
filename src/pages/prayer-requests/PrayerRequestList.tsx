import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { FilterModal } from "@/components/members/FilterModal";
import { useToast } from "@/hooks/use-toast";
import { BulkActions } from "@/components/shared/BulkActions";

export default function PrayerRequestList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");

  // Add requests state
  const [requests, setRequests] = useState([
    {
      id: "1",
      description: "Pray for healing",
      status: "pending",
      date: "2024-01-15",
    },
  ]);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesDate = !dateFilter || request.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

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
              status: "prayed"
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
          data={filteredRequests}
          columns={[
            { 
              header: "Description", 
              accessor: "description",
              className: "text-[14px]"
            },
            { 
              header: "Status", 
              accessor: (request) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  request.status === 'prayed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.status}
                </span>
              ),
              className: "text-[14px]"
            },
            {
              header: "Date",
              accessor: "date",
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
            { value: "markPrayed", label: "Mark as Prayed" },
            { value: "markPending", label: "Mark as Pending" },
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
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueLocations={[]}
      />
    </div>
};
