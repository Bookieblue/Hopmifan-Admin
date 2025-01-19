import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EventList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const eventsPerPage = 15;

  const [events] = useState(Array.from({ length: 32 }, (_, i) => ({ 
    id: `EVT-${String(i + 1).padStart(3, '0')}`,
    title: `Event ${i + 1}`,
    speaker: i % 2 === 0 ? "Pastor John" : "Sarah Smith",
    date: new Date(2024, 2, 15 - i).toISOString().split('T')[0],
    status: i % 3 === 0 ? "active" : "inactive"
  })));

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Speaker", accessor: "speaker" },
    { header: "Date", accessor: "date" },
    { 
      header: "Status", 
      accessor: (event: any) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {event.status}
        </span>
      )
    },
  ];

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  const handleDelete = (eventId: string) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      toast({
        description: `Event ${eventToDelete} has been deleted successfully.`
      });
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const handleShare = (eventId: string) => {
    const eventUrl = `${window.location.origin}/events/${eventId}`;
    
    navigator.clipboard.writeText(eventUrl).then(() => {
      toast({
        description: "Event link copied to clipboard!"
      });
    }).catch(() => {
      toast({
        description: "Failed to copy link",
        variant: "destructive"
      });
    });
  };

  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      toast({
        description: `${selectedEvents.length} events have been deleted.`
      });
      setSelectedEvents([]);
    } else if (bulkAction === 'export') {
      toast({
        description: 'Events exported successfully.'
      });
    } else if (bulkAction === 'publish') {
      toast({
        description: `${selectedEvents.length} events have been published.`
      });
      setSelectedEvents([]);
    } else if (bulkAction === 'draft') {
      toast({
        description: `${selectedEvents.length} events have been moved to draft.`
      });
      setSelectedEvents([]);
    }
    setBulkAction("");
  };

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "export", label: "Export as CSV" },
    { value: "publish", label: "Publish Selected" },
    { value: "draft", label: "Move to Draft" },
  ];

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handleRowClick = (id: string) => {
    navigate(`/events/${id}/edit`);
  };

  const handleApplyDateFilter = () => {
    // Filter logic would go here
    setIsDateFilterOpen(false);
    toast({
      description: "Date filter applied successfully"
    });
  };

  const handleResetDateFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setIsDateFilterOpen(false);
    toast({
      description: "Date filter reset"
    });
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link to="/events/create">
          <Button size="default" className="bg-purple-600 hover:bg-purple-700 px-3 md:px-4">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search events..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDateFilterOpen} onOpenChange={setIsDateFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Filter by Date
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter by Date Range</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="flex flex-col gap-2">
                <label>Start Date</label>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>
              <div className="flex flex-col gap-2">
                <label>End Date</label>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleResetDateFilter}>
                  Reset
                </Button>
                <Button onClick={handleApplyDateFilter}>
                  Apply Filter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={currentEvents}
        columns={columns}
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
          onShare: handleShare,
        }}
        bulkActions={bulkActions}
        bulkAction={bulkAction}
        setBulkAction={setBulkAction}
        onBulkAction={handleBulkAction}
        onRowClick={handleRowClick}
      />

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            total={totalPages}
            value={currentPage}
            onValueChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
