import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SermonFilterModal } from "@/components/sermons/FilterModal";
import { SermonDetailsModal } from "@/components/sermons/SermonDetailsModal";
import { Link } from "react-router-dom";

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

  const columns = [
    { 
      header: "Title & Speaker", 
      accessor: (sermon: any) => (
        <div>
          <div className="font-medium">{sermon.title}</div>
          <div className="text-sm text-gray-500">{sermon.speaker}</div>
        </div>
      )
    },
    { 
      header: "YouTube Link", 
      accessor: (sermon: any) => (
        <a 
          href={sermon.youtubeLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Sermon
        </a>
      )
    },
    { 
      header: "Status & Date", 
      accessor: (sermon: any) => (
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            sermon.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {sermon.status === 'published' ? 'Published' : 'Draft'}
          </span>
          <div className="text-sm text-gray-500 mt-1">{sermon.date}</div>
        </div>
      )
    },
  ];

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

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = 
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sermon.status === statusFilter;
    const matchesDate = !dateFilter || sermon.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleRowClick = (id: string) => {
    const sermon = sermons.find(s => s.id === id);
    if (sermon) {
      setSelectedSermon(sermon);
      setDetailsModalOpen(true);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search sermons..."
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

      <div className="bg-white md:rounded-lg md:border">
        <div className="md:hidden flex justify-between items-center px-4 py-2 bg-gray-50 border-b">
          <h2 className="font-medium text-sm text-gray-600">Sermon</h2>
          <h2 className="font-medium text-sm text-gray-600">Status</h2>
        </div>
        <DataTable
          data={filteredSermons}
          columns={columns}
          selectedItems={[]}
          onSelectItem={() => {}}
          onSelectAll={() => {}}
          getItemId={(item) => item.id}
          onRowClick={handleRowClick}
          showCheckboxes={false}
          CardComponent={({ item }) => (
            <div 
              className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleRowClick(item.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.speaker}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}