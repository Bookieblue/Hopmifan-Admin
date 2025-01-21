import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, CheckSquare, XSquare, Copy } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { FilterModal } from "@/components/events/FilterModal";
import { EventCard } from "@/components/events/EventCard";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BulkActions } from "@/components/shared/BulkActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function EventList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [bulkAction, setBulkAction] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string>("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Sample data
  const events = [
    {
      id: "1",
      title: "Sunday Service",
      location: "Main Hall",
      date: "24 Mar 2024",
      time: "10:00 AM",
      status: "published",
    },
    {
      id: "2",
      title: "Youth Conference",
      location: "Conference Room",
      date: "25 Mar 2024",
      time: "2:00 PM",
      status: "draft",
    },
  ];

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    toast({
      description: "Event deleted successfully",
    });
    setDeleteDialogOpen(false);
    setEventToDelete("");
    setSelectedItems(selectedItems.filter(itemId => itemId !== eventToDelete));
  };

  const handleStatusChange = (id: string, status: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    toast({
      description: `Event ${status === 'published' ? 'published' : 'unpublished'} successfully`,
    });
  };

  const handleDuplicate = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    toast({
      description: "Event duplicated successfully",
    });
  };

  const handleBulkAction = () => {
    if (!selectedItems.length) return;

    switch (bulkAction) {
      case "delete":
        toast({
          description: `${selectedItems.length} events deleted successfully`,
        });
        break;
      case "publish":
        toast({
          description: `${selectedItems.length} events published successfully`,
        });
        break;
      case "unpublish":
        toast({
          description: `${selectedItems.length} events unpublished successfully`,
        });
        break;
      default:
        break;
    }
    setSelectedItems([]);
    setBulkAction("");
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === "all" || event.location === locationFilter;
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesDate = !dateFilter || event.date === dateFilter;
    return matchesSearch && matchesLocation && matchesStatus && matchesDate;
  });

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedItems(prev =>
      checked ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? filteredEvents.map(event => event.id) : []);
  };

  const handleRowClick = (id: string) => {
    navigate(`/events/${id}/edit`);
  };

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "publish", label: "Publish Selected" },
    { value: "unpublish", label: "Unpublish Selected" }
  ];

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

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={filteredEvents}
          columns={[
            { 
              header: "Title", 
              accessor: "title",
              className: "text-[14px] cursor-pointer"
            },
            { 
              header: "Location", 
              accessor: "location",
              className: "text-[14px] cursor-pointer"
            },
            { 
              header: "Date & Status", 
              accessor: (event: any) => (
                <div className="space-y-1 text-[14px]">
                  <div>{event.date} {event.time}</div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ),
              className: "text-[14px] cursor-pointer"
            },
            {
              header: "Actions",
              accessor: (event: any) => (
                <div className="flex items-center justify-end gap-2 text-[14px]" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 dropdown-trigger"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-[200px] bg-white dropdown-content"
                    >
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/events/${event.id}/edit`);
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleDuplicate(event.id, e)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => handleStatusChange(event.id, event.status === 'published' ? 'draft' : 'published', e)}
                      >
                        {event.status === 'published' ? (
                          <>
                            <XSquare className="h-4 w-4 mr-2" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <CheckSquare className="h-4 w-4 mr-2" />
                            Publish
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => handleDelete(event.id, e)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ),
              className: "w-[100px] text-[14px]"
            }
          ]}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          getItemId={(item) => item.id}
          onRowClick={handleRowClick}
          CardComponent={isMobile ? EventCard : undefined}
          actions={{
            onDelete: handleDelete,
            onStatusChange: handleStatusChange,
            onDuplicate: handleDuplicate,
          }}
          showCheckboxes={true}
          bulkActions={bulkActions}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
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
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueLocations={Array.from(new Set(events.map(event => event.location)))}
      />

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
