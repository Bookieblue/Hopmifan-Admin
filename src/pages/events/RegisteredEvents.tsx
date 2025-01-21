import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EventFilterModal } from "@/components/registered-events/FilterModal";
import { EventDetailsModal } from "@/components/registered-events/EventDetailsModal";
import { BulkActions } from "@/components/shared/BulkActions";
import { useToast } from "@/hooks/use-toast";

const sampleRegistrations = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "+234 801 234 5678",
    email: "john.doe@gmail.com",
    country: "Nigeria",
    cityState: "Lagos, LA",
    eventName: "Easter Sunday Service",
    message: "I would like to attend with my family of 4.",
    dateSubmitted: new Date(2024, 2, 15).toLocaleDateString(),
    status: "pending"
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+234 802 345 6789",
    email: "jane.smith@yahoo.com",
    country: "Nigeria",
    cityState: "Abuja, FC",
    eventName: "Youth Conference 2024",
    message: "Looking forward to attending the conference.",
    dateSubmitted: new Date(2024, 2, 14).toLocaleDateString(),
    status: "confirmed"
  }
];

export default function RegisteredEvents() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [registrations, setRegistrations] = useState(sampleRegistrations);
  const [selectedRegistrations, setSelectedRegistrations] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");

  const columns = [
    { 
      header: "Name", 
      accessor: (registration: any) => (
        <div>
          <div className="font-medium">{`${registration.firstName} ${registration.lastName}`}</div>
          <div className="text-sm text-gray-500">{registration.email}</div>
        </div>
      )
    },
    { 
      header: "Contact Info", 
      accessor: (registration: any) => (
        <div>
          <div>{registration.phone}</div>
          <div className="text-sm text-gray-500">{registration.eventName}</div>
        </div>
      )
    },
    { 
      header: "Location", 
      accessor: (registration: any) => (
        <div>
          <div>{registration.country}</div>
          <div className="text-sm text-gray-500">{registration.cityState}</div>
        </div>
      )
    },
    { 
      header: "Status & Date", 
      accessor: (registration: any) => (
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            registration.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {registration.status === 'confirmed' ? 'Confirmed' : 'Pending'}
          </span>
          <div className="text-sm text-gray-500 mt-1">{registration.dateSubmitted}</div>
        </div>
      )
    },
  ];

  const handleStatusChange = (status: string) => {
    if (selectedRegistration) {
      setRegistrations(registrations.map(registration => 
        registration.id === selectedRegistration.id 
          ? { ...registration, status }
          : registration
      ));
      setDetailsModalOpen(false);
    }
  };

  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = 
      `${registration.firstName} ${registration.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      registration.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === 'all' || registration.country === countryFilter;
    const matchesStatus = statusFilter === 'all' || registration.status === statusFilter;
    const matchesDate = !dateFilter || registration.dateSubmitted === dateFilter;
    
    return matchesSearch && matchesCountry && matchesStatus && matchesDate;
  });

  const handleRowClick = (id: string) => {
    const registration = registrations.find(r => r.id === id);
    if (registration) {
      setSelectedRegistration(registration);
      setDetailsModalOpen(true);
    }
  };

  const handleCardClick = (registration: any) => {
    setSelectedRegistration(registration);
    setDetailsModalOpen(true);
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedRegistrations.length === 0) return;

    switch (bulkAction) {
      case "markConfirmed":
        toast({
          description: `${selectedRegistrations.length} registrations marked as confirmed`,
        });
        break;
      case "markPending":
        toast({
          description: `${selectedRegistrations.length} registrations marked as pending`,
        });
        break;
      case "delete":
        toast({
          description: `${selectedRegistrations.length} registrations deleted`,
        });
        break;
    }
    setSelectedRegistrations([]);
    setBulkAction("");
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Event Registrations</h1>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search registrations..."
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

      <EventFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueCountries={Array.from(new Set(registrations.map(registration => registration.country)))}
      />

      <EventDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        registration={selectedRegistration}
        onStatusChange={handleStatusChange}
      />

      <div className="bg-white md:rounded-lg md:border">
        <div className="md:hidden flex justify-between items-center px-4 py-2 bg-gray-50 border-b">
          <h2 className="font-medium text-sm text-gray-600">Registration</h2>
          <h2 className="font-medium text-sm text-gray-600">Status</h2>
        </div>
        <DataTable
          data={filteredRegistrations}
          columns={columns}
          selectedItems={selectedRegistrations}
          onSelectItem={(id, checked) => {
            setSelectedRegistrations(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedRegistrations(checked ? filteredRegistrations.map(r => r.id) : []);
          }}
          getItemId={(item) => item.id}
          onRowClick={handleCardClick}
          showCheckboxes={true}
          CardComponent={({ item }) => (
            <div 
              className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleCardClick(item)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{`${item.firstName} ${item.lastName}`}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            </div>
          )}
          bulkActions={[
            { value: "markConfirmed", label: "Mark as Confirmed" },
            { value: "markPending", label: "Mark as Pending" },
            { value: "delete", label: "Delete Selected" }
          ]}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />

        {selectedRegistrations.length > 0 && (
          <BulkActions
            selectedCount={selectedRegistrations.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "markConfirmed", label: "Mark as Confirmed" },
              { value: "markPending", label: "Mark as Pending" },
              { value: "delete", label: "Delete Selected" }
            ]}
          />
        )}
      </div>
    </div>
  );
}