import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search, FileDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterModal } from "@/components/prayer-requests/FilterModal";
import { DetailsModal } from "@/components/shared/DetailsModal";
import { BulkActions } from "@/components/shared/BulkActions";
import { ViewDetailsButton } from "@/components/shared/ViewDetailsButton";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

// const samplePrayerRequests = [
//   {
//     id: "1",
//     firstName: "Alice",
//     lastName: "Johnson",
//     phone: "+234 803 456 7890",
//     email: "alice.johnson@gmail.com",
//     country: "Nigeria",
//     cityState: "Lagos, LA",
//     preferredContact: "WhatsApp",
//     request: "Please pray for my upcoming surgery next week. I need God's healing touch and divine protection during the procedure. I believe in the power of collective prayers.",
//     dateSubmitted: new Date(2024, 0, 20).toLocaleDateString(),
//     status: "pending"
//   },
//   {
//     id: "2",
//     firstName: "Bob",
//     lastName: "Wilson",
//     phone: "+234 804 567 8901",
//     email: "bob.wilson@yahoo.com",
//     country: "Nigeria",
//     cityState: "Abuja, FC",
//     preferredContact: "Phone",
//     request: "Requesting prayers for my family's spiritual growth and unity. We've been facing some challenges lately and need God's intervention for peace and harmony in our home.",
//     dateSubmitted: new Date(2024, 0, 19).toLocaleDateString(),
//     status: "pending"
//   },
//   {
//     id: "3",
//     firstName: "Grace",
//     lastName: "Okonkwo",
//     phone: "+234 805 678 9012",
//     email: "grace.okonkwo@gmail.com",
//     country: "Nigeria",
//     cityState: "Port Harcourt, RV",
//     preferredContact: "Email",
//     request: "I need prayers for my business that has been struggling lately. Believing God for a turnaround and His divine provision.",
//     dateSubmitted: new Date(2024, 0, 18).toLocaleDateString(),
//     status: "prayed"
//   }
// ];

export default function PrayerRequestList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");

  const backendURL = import.meta.env.VITE_PUBLIC_API_BASE_URL || "";


  const fetchPrayerRequest = async () => {
      try {
        const response = await fetch(`${backendURL}/api/prayer-request?page=1&limit=20`);
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error("Failed to fetch prayer requests");
        }
    
        const result = await response.json();
        console.log('Data:', result); // Debugging log to see what’s returned
    
        return Array.isArray(result.data?.prayerRequests)
          ? result.data.prayerRequests.map(prayer => ({
              ...prayer,
              status: prayer.replied ? "completed" : "pending",
            }))
          : [];
      } catch (error) {
        console.error("Error fetching prayer requests:", error);
        throw error;
      }
    };
    
  
  const { data: requests = [], isLoading, isError } = useQuery({
    queryKey: ["prayerRequests"],
    queryFn: fetchPrayerRequest,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  const exportAsCSV = () => {
    const headers = ["Name", "Email", "Phone", "Location", "Request", "Status", "Date"];
    const csvData = requests.map(request => [
      `${request.firstName} ${request.lastName}`,
      request.email,
      request.phoneNumber,
      `${request.country}, ${request.cityAndState}`,
      request.request,
      request.status,
      request.dateSubmitted
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "prayer_requests.csv";
    link.click();
    toast({
      description: "Prayer requests exported as CSV successfully",
    });
  };

  const exportAsPDF = () => {
    window.print();
    toast({
      description: "Prayer requests exported as PDF successfully",
    });
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
          <div>{request.phoneNumber}</div>
          <div className="text-sm text-gray-500 capitalize">{request.methodOfContact} preferred</div>
        </div>
      )
    },
    { 
      header: "Location", 
      accessor: (request: any) => (
        <div>
          <div>{request.country}</div>
          <div className="text-sm text-gray-500">{request.cityAndState}</div>
        </div>
      )
    },
    { 
      header: "Status & Date", 
      accessor: (request: any) => (
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            request.status === 'prayed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {request.status === 'prayed' ? 'Replied' : 'Pending'}
          </span>
          <div className="text-sm text-gray-500 mt-1">{request.dateSubmitted}</div>
        </div>
      )
    },
    {
      header: "Actions",
      accessor: (request: any) => (
        <div className="flex items-center justify-end gap-2">
          <ViewDetailsButton onClick={() => handleViewDetails(request.id)} />
        </div>
      )
    }
  ];

  const handleViewDetails = (id: string) => {
    const request = requests.find(r => r.id === id);
    if (request) {
      setSelectedRequest({
        ...request,
        message: request.request // Map request field to message for DetailsModal
      });
      setDetailsModalOpen(true);
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedRequest) {
      const updatedRequests = requests.map(request =>
        request.id === selectedRequest.id ? { ...request, status } : request
      );
      // setRequests(updatedRequests);
      localStorage.setItem('prayerRequests', JSON.stringify(updatedRequests));
      setDetailsModalOpen(false);
      toast({
        description: "Prayer request status updated successfully",
      });
    }
  };

  const filteredRequests = requests.filter(request => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      `${request.firstName} ${request.lastName}`.toLowerCase().includes(searchLower) ||
      request.email.toLowerCase().includes(searchLower) ||
      request.phoneNumber.toLowerCase().includes(searchLower);
    const matchesCountry = countryFilter === "all" || request.country === countryFilter;
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesDate = !dateFilter || request.dateSubmitted === dateFilter;
    return matchesSearch && matchesCountry && matchesStatus && matchesDate;
  });

  const handleBulkAction = () => {
    if (!selectedRequests.length || !bulkAction) return;

    const updatedRequests = requests.map(request => {
      if (selectedRequests.includes(request.id)) {
        return {
          ...request,
          status: bulkAction === 'markPrayed' ? 'prayed' : 'pending'
        };
      }
      return request;
    });

    // setRequests(updatedRequests);
    localStorage.setItem('prayerRequests', JSON.stringify(updatedRequests));
    
    toast({
      description: `${selectedRequests.length} prayer requests updated successfully`,
    });
    
    setSelectedRequests([]);
    setBulkAction("");
  };

  return (
    <div className="mobile-spacing">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Prayer Requests</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={exportAsCSV}
          >
            <FileDown className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={exportAsPDF}
          >
            <FileDown className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
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
      {isLoading ? (
    <div className="flex justify-center items-center p-6">
      <span className="animate-spin border-4 border-gray-300 border-t-gray-600 rounded-full w-6 h-6"></span>
      <span className="ml-3 text-gray-600">Loading prayer requests...</span>
    </div>
  ) : isError ? (
    <div className="text-center text-red-500 p-6">Failed to load prayer requests. Please try again.</div>
  ) : (  
        <DataTable
          data={filteredRequests}
          columns={columns}
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
          onRowClick={handleViewDetails}
          showCheckboxes={true}
          CardComponent={({ item }) => (
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base mb-1">{`${item.firstName} ${item.lastName}`}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.email}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.dateSubmitted}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'prayed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'prayed' ? 'Replied' : 'Pending'}
                    </span>
                  </div>
                </div>
                <ViewDetailsButton onClick={() => handleViewDetails(item.id)} />
              </div>
            </div>
          )}
        />
)}

        {selectedRequests.length > 0 && (
          <BulkActions
            selectedCount={selectedRequests.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "markPrayed", label: "Mark as Replied" },
              { value: "markPending", label: "Mark as Pending" }
            ]}
          />
        )}
      </div>

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueCountries={Array.from(new Set(requests.map(request => request.country)))}
      />

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Prayer Request Details"
        data={selectedRequest}
        onStatusChange={handleStatusChange}
        statusLabels={{
          pending: 'Pending',
          completed: 'Replied',
          buttonText: 'Mark as Replied'
        }}
      />
    </div>
  );
}
