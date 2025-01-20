import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search, MoreVertical, Edit, Trash2, Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { FilterModal } from "@/components/events/FilterModal";
import { useToast } from "@/hooks/use-toast";
import { EventCard } from "@/components/events/EventCard";
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

const sampleEvents = {
  "EVT-001": {
    title: "Annual Tech Conference 2024",
    date: new Date(2024, 5, 15).toLocaleDateString(),
    time: "09:00 AM",
    location: "Virtual",
    status: "published",
    description: "Join us for our annual tech conference featuring industry leaders.",
    meetingLink: "https://meet.google.com/xyz",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
  },
  "EVT-002": {
    title: "Web Development Workshop",
    date: new Date(2024, 5, 20).toLocaleDateString(),
    time: "02:00 PM",
    location: "San Francisco",
    status: "draft",
    description: "Hands-on workshop on modern web development practices.",
    meetingLink: "",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
  }
};

export default function EventList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string>("");
  const [bulkAction, setBulkAction] = useState("");
  const eventsPerPage = 15;
  
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem('events');
    if (stored) {
      return Object.entries(JSON.parse(stored)).map(([id, event]: [string, any]) => ({
        id,
        ...event
      }));
    }
    localStorage.setItem('events', JSON.stringify(sampleEvents));
    return Object.entries(sampleEvents).map(([id, event]) => ({
      id,
      ...event
    }));
  });

  const handleDelete = (id: string) => {
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/events/${id}/edit`);
  };

  const handleDuplicate = (id: string) => {
    const eventToDuplicate = events.find(event => event.id === id);
    if (!eventToDuplicate) return;

    const newId = `EVT-${Math.random().toString(36).substr(2, 9)}`;
    const duplicatedEvent = {
      ...eventToDuplicate,
      id: newId,
      title: `${eventToDuplicate.title} (Copy)`,
      status: 'draft'
    };

    const updatedEvents = [...events, duplicatedEvent];
    setEvents(updatedEvents);

    // Update localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events') || '{}');
    storedEvents[newId] = {
      ...duplicatedEvent,
      id: undefined // Remove id from stored object as it's used as the key
    };
    localStorage.setItem('events', JSON.stringify(storedEvents));

    toast({
      description: "Event duplicated successfully."
    });
  };

  const confirmDelete = () => {
    const updatedEvents = events.filter(event => event.id !== eventToDelete);
    setEvents(updatedEvents);
    
    // Update localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events') || '{}');
    delete storedEvents[eventToDelete];
    localStorage.setItem('events', JSON.stringify(storedEvents));
    
    toast({
      description: "Event deleted successfully."
    });
    
    setDeleteDialogOpen(false);
    setEventToDelete("");
    setSelectedEvents(selectedEvents.filter(id => id !== eventToDelete));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || event.location === locationFilter;
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesDate = !dateFilter || event.date === dateFilter;
    
    return matchesSearch && matchesLocation && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const uniqueLocations = Array.from(new Set(events.map(event => event.location)));

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "publish", label: "Publish Selected" },
  ];

  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      const updatedEvents = events.filter(event => !selectedEvents.includes(event.id));
      setEvents(updatedEvents);
      
      // Update localStorage
      const storedEvents = JSON.parse(localStorage.getItem('events') || '{}');
      selectedEvents.forEach(id => {
        delete storedEvents[id];
      });
      localStorage.setItem('events', JSON.stringify(storedEvents));
      
      toast({
        description: `${selectedEvents.length} events deleted successfully.`
      });
      
      setSelectedEvents([]);
    } else if (bulkAction === 'publish') {
      const updatedEvents = events.map(event => {
        if (selectedEvents.includes(event.id)) {
          return { ...event, status: 'published' };
        }
        return event;
      });
      setEvents(updatedEvents);
      
      // Update localStorage
      const storedEvents = JSON.parse(localStorage.getItem('events') || '{}');
      selectedEvents.forEach(id => {
        if (storedEvents[id]) {
          storedEvents[id].status = 'published';
        }
      });
      localStorage.setItem('events', JSON.stringify(storedEvents));
      
      toast({
        description: `${selectedEvents.length} events published successfully.`
      });
      
      setSelectedEvents([]);
    }
    setBulkAction("");
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="page-heading">Events</h1>
        <Link to="/events/create">
          <Button size="default" className="bg-purple-600 hover:bg-purple-700 px-3 md:px-4">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </Link>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search events..."
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

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueLocations={uniqueLocations}
      />

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={currentEvents}
          columns={[
            { header: "Title", accessor: "title" },
            { 
              header: "Date & Time", 
              accessor: (event: any) => (
                <div className="space-y-1">
                  <div>{event.date}</div>
                  <div className="text-sm text-muted-foreground">{event.time}</div>
                </div>
              )
            },
            { header: "Location", accessor: "location" },
            { 
              header: "Status", 
              accessor: (event: any) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.status}
                </span>
              )
            },
            {
              header: "Actions",
              accessor: (event: any) => (
                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(event.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ),
              className: "w-[50px]"
            }
          ]}
          selectedItems={selectedEvents}
          onSelectItem={(id, checked) => {
            if (checked) {
              setSelectedEvents([...selectedEvents, id]);
            } else {
              setSelectedEvents(selectedEvents.filter(eventId => eventId !== id));
            }
          }}
          onSelectAll={(checked) => {
            if (checked) {
              setSelectedEvents(currentEvents.map(event => event.id));
            } else {
              setSelectedEvents([]);
            }
          }}
          getItemId={(item) => item.id}
          actions={{
            onDelete: handleDelete,
            onEdit: handleEdit,
            onDuplicate: handleDuplicate
          }}
          onRowClick={handleEdit}
          CardComponent={EventCard}
          showCheckboxes={true}
          bulkActions={bulkActions}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />

        <BulkActions
          selectedCount={selectedEvents.length}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
          actions={bulkActions}
        />
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event
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
