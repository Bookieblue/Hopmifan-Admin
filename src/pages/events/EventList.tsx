import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterModal } from "@/components/events/FilterModal";
import { useToast } from "@/hooks/use-toast";

export default function EventList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { toast } = useToast();

  // Sample data
  const events = [
    {
      id: "1",
      title: "Sunday Service",
      location: "Main Hall",
      date: "24 Mar 2024",
      status: "published",
    },
    {
      id: "2",
      title: "Youth Conference",
      location: "Conference Room",
      date: "25 Mar 2024",
      status: "draft",
    },
  ];

  const uniqueLocations = Array.from(new Set(events.map(event => event.location)));

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === "all" || event.location === locationFilter;
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesDate = !dateFilter || event.date === dateFilter;

    return matchesSearch && matchesLocation && matchesStatus && matchesDate;
  });

  const handleDelete = (id: string) => {
    toast({
      description: "Event deleted successfully",
    });
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <Link 
          to="/events/create"
          className="bg-[#695CAE] hover:bg-[#695CAE]/90 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          New Event
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filter
        </Button>
      </div>

      <DataTable
        data={filteredEvents}
        columns={[
          { 
            header: "Title", 
            accessor: "title",
            className: "text-[14px]"
          },
          { 
            header: "Location", 
            accessor: "location",
            className: "text-[14px]"
          },
          { 
            header: "Date & Status", 
            accessor: (event) => (
              <div className="space-y-1 text-[14px]">
                <div>{event.date}</div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.status}
                </span>
              </div>
            ),
            className: "text-[14px]"
          },
          {
            header: "Actions",
            accessor: (event) => (
              <div className="flex items-center justify-end gap-2 text-[14px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </Button>
              </div>
            ),
            className: "w-[100px] text-[14px]"
          }
        ]}
        selectedItems={[]}
        onSelectItem={() => {}}
        onSelectAll={() => {}}
        getItemId={(item) => item.id}
        showCheckboxes={false}
      />

      <FilterModal
        open={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueLocations={uniqueLocations}
      />
    </div>
  );
}