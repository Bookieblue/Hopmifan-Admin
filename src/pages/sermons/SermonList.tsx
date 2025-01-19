import { useState } from "react";
import { Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SermonCard } from "@/components/sermons/SermonCard";
import { SermonFilterModal } from "@/components/sermons/FilterModal";
import { SermonDetailsModal } from "@/components/sermons/SermonDetailsModal";

const sampleSermons = [
  {
    id: "1",
    title: "Walking in Faith",
    date: new Date(2024, 2, 15).toLocaleDateString(),
    youtubeLink: "https://youtube.com/watch?v=123",
    description: "A powerful message about walking in faith during difficult times.",
    speaker: "Pastor John Doe",
    status: "published"
  },
  {
    id: "2",
    title: "The Power of Prayer",
    date: new Date(2024, 2, 14).toLocaleDateString(),
    youtubeLink: "https://youtube.com/watch?v=456",
    description: "Understanding the importance of prayer in our daily lives.",
    speaker: "Pastor Jane Smith",
    status: "draft"
  }
];

export default function SermonList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [sermons, setSermons] = useState(sampleSermons);

  const handleStatusChange = (status: string) => {
    if (selectedSermon) {
      setSermons(sermons.map(sermon => 
        sermon.id === selectedSermon.id 
          ? { ...sermon, status }
          : sermon
      ));
      setDetailsModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setSermons(sermons.filter(sermon => sermon.id !== id));
  };

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = 
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sermon.status === statusFilter;
    const matchesDate = !dateFilter || sermon.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Sermons</h1>
        <Link to="/sermons/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Sermon
          </Button>
        </Link>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search sermons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
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

      <div className="grid grid-cols-1 gap-4">
        {filteredSermons.map((sermon) => (
          <SermonCard
            key={sermon.id}
            item={sermon}
            actions={{
              onDelete: handleDelete,
              onStatusChange: (id, status) => {
                setSermons(sermons.map(s => 
                  s.id === id ? { ...s, status } : s
                ));
              }
            }}
          />
        ))}
      </div>

      <SermonFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      <SermonDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        sermon={selectedSermon}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}