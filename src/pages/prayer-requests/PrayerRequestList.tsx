import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PrayerRequestDetailsModal } from "@/components/prayer-requests/PrayerRequestDetailsModal";
import { PrayerRequestFilterModal } from "@/components/prayer-requests/FilterModal";

const samplePrayerRequests = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "+234 801 234 5678",
    email: "john.doe@example.com",
    country: "Nigeria",
    cityState: "Lagos, LA",
    preferredContact: "whatsapp",
    prayerRequest: "Please pray for my upcoming surgery and quick recovery.",
    dateSubmitted: new Date(2024, 2, 15).toLocaleDateString(),
    status: "pending"
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "+234 802 345 6789",
    email: "sarah.j@example.com",
    country: "Nigeria",
    cityState: "Abuja, FC",
    preferredContact: "email",
    prayerRequest: "Seeking prayers for my family's protection and guidance.",
    dateSubmitted: new Date(2024, 2, 14).toLocaleDateString(),
    status: "prayed"
  }
];

export default function PrayerRequestList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [requests, setRequests] = useState(samplePrayerRequests);

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
          <div className="text-sm text-gray-500 capitalize">{request.preferredContact} preferred</div>
        </div>
      )
    },
    { 
      header: "Location", 
      accessor: (request: any) => (
        <div>
          <div>{request.country}</div>
          <div className="text-sm text-gray-500">{request.cityState}</div>
        </div>
      )
    },
    { 
      header: "Status & Date", 
      accessor: (request: any) => (
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            request.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {request.status === 'replied' ? 'Replied' : 'Pending'}
          </span>
          <div className="text-sm text-gray-500 mt-1">{request.dateSubmitted}</div>
        </div>
      )
    },
  ];

  const handleStatusChange = (status: string) => {
    if (selectedRequest) {
      setRequests(requests.map(request => 
        request.id === selectedRequest.id 
          ? { ...request, status }
          : request
      ));
      setDetailsModalOpen(false);
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      `${request.firstName} ${request.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === 'all' || request.country === countryFilter;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesDate = !dateFilter || request.dateSubmitted === dateFilter;
    
    return matchesSearch && matchesCountry && matchesStatus && matchesDate;
  });

  const handleRowClick = (id: string) => {
    const request = requests.find(r => r.id === id);
    if (request) {
      setSelectedRequest(request);
      setDetailsModalOpen(true);
    }
  };

  const handleCardClick = (request: any) => {
    setSelectedRequest(request);
    setDetailsModalOpen(true);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Prayer Requests</h1>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search prayer requests..."
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

      <PrayerRequestFilterModal
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

      <PrayerRequestDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        request={selectedRequest}
        onStatusChange={handleStatusChange}
      />

      <div className="bg-white md:rounded-lg md:border">
        <div className="md:hidden flex justify-between items-center px-4 py-2 bg-gray-50 border-b">
          <h2 className="font-medium text-sm text-gray-600">Prayer Request</h2>
          <h2 className="font-medium text-sm text-gray-600">Status</h2>
        </div>
        <DataTable
          data={filteredRequests}
          columns={columns}
          selectedItems={[]}
          onSelectItem={() => {}}
          onSelectAll={() => {}}
          getItemId={(item) => item.id}
          onRowClick={handleCardClick}
          showCheckboxes={false}
          CardComponent={({ item }) => (
            <div 
              className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleCardClick(item)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">{`${item.firstName} ${item.lastName}`}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'replied' ? 'Replied' : 'Pending'}
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-sm">{item.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-sm">{item.country}, {item.cityState}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prayer Request</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.prayerRequest}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Submitted</p>
                  <p className="text-sm">{item.dateSubmitted}</p>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}