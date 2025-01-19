import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/DataTable";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@/types/event";
import { Badge } from "@/components/ui/badge";

export default function EventList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // Mock data - replace with actual data fetching
  const [events] = useState<Event[]>([
    {
      id: "EVT-001",
      title: "Sunday Service",
      date: "2024-03-24",
      time: "10:00 AM",
      description: "Weekly Sunday Service",
      location: "Main Hall",
      status: "published"
    },
    {
      id: "EVT-002",
      title: "Bible Study",
      date: "2024-03-26",
      time: "7:00 PM",
      description: "Weekly Bible Study Session",
      location: "Room 101",
      status: "draft"
    }
  ]);

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" },
    { header: "Location", accessor: "location" },
    {
      header: "Status",
      accessor: (event: Event) => (
        <Badge variant={event.status === "published" ? "success" : "secondary"}>
          {event.status === "published" ? "Published" : "Draft"}
        </Badge>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    toast({
      description: `Event ${id} has been deleted.`
    });
  };

  const handleSelectEvent = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEvents([...selectedEvents, id]);
    } else {
      setSelectedEvents(selectedEvents.filter(eventId => eventId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEvents(events.map(event => event.id));
    } else {
      setSelectedEvents([]);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-sm text-muted-foreground">
            Manage your church events here
          </p>
        </div>
        <Button onClick={() => navigate("create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable
          data={events.filter(event =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          columns={columns}
          selectedItems={selectedEvents}
          onSelectItem={handleSelectEvent}
          onSelectAll={handleSelectAll}
          getItemId={(item: Event) => item.id}
          onRowClick={(id) => navigate(id)}
          actions={{
            onDelete: handleDelete,
          }}
        />
      </div>
    </div>
  );
}