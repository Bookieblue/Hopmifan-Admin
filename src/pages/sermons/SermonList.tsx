import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DetailsModal } from "@/components/shared/DetailsModal";
import { useToast } from "@/hooks/use-toast";
import { SermonCard } from "@/components/sermons/SermonCard";
import { useNavigate } from "react-router-dom";

const sampleSermons = [
  {
    id: "SER-001",
    title: "The Power of Faith",
    preacher: "Pastor John Smith",
    publishDate: "Mar 15, 2024",
    status: "published",
    description: "A deep dive into the importance of faith in our daily lives.",
    youtubeLink: "https://youtube.com/watch?v=123"
  },
  {
    id: "SER-002",
    title: "Walking in Love",
    preacher: "Pastor Sarah Johnson",
    publishDate: "Mar 12, 2024",
    status: "draft",
    description: "Understanding the true meaning of walking in love.",
    youtubeLink: "https://youtube.com/watch?v=456"
  },
  {
    id: "SER-003",
    title: "The Grace Journey",
    preacher: "Pastor Michael Brown",
    publishDate: "Mar 10, 2024",
    status: "published",
    description: "Exploring the depths of God's grace in our lives.",
    youtubeLink: "https://youtube.com/watch?v=789"
  },
  {
    id: "SER-004",
    title: "Living with Purpose",
    preacher: "Pastor Emma Wilson",
    publishDate: "Mar 8, 2024",
    status: "published",
    description: "Discovering and fulfilling your God-given purpose.",
    youtubeLink: "https://youtube.com/watch?v=012"
  },
  {
    id: "SER-005",
    title: "The Power of Prayer",
    preacher: "Pastor David Lee",
    publishDate: "Mar 5, 2024",
    status: "draft",
    description: "Understanding the transformative power of prayer.",
    youtubeLink: "https://youtube.com/watch?v=345"
  }
];

export default function SermonList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sermons, setSermons] = useState(() => {
    const stored = localStorage.getItem('sermons');
    return stored ? JSON.parse(stored) : sampleSermons;
  });
  const [selectedSermon, setSelectedSermon] = useState<any | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedSermons, setSelectedSermons] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");

  const filteredSermons = sermons.filter(sermon => {
    return (
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleViewDetails = (id: string) => {
    const sermon = sermons.find(s => s.id === id);
    if (sermon) {
      setSelectedSermon(sermon);
      setDetailsModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const updatedSermons = sermons.filter(sermon => sermon.id !== id);
    setSermons(updatedSermons);
    localStorage.setItem('sermons', JSON.stringify(updatedSermons));
    toast({
      description: "Sermon deleted successfully",
    });
  };

  const handleStatusChange = (id: string, currentStatus: string) => {
    const updatedSermons = sermons.map(sermon => {
      if (sermon.id === id) {
        return {
          ...sermon,
          status: currentStatus === 'published' ? 'draft' : 'published'
        };
      }
      return sermon;
    });
    setSermons(updatedSermons);
    localStorage.setItem('sermons', JSON.stringify(updatedSermons));
    toast({
      description: `Sermon ${currentStatus === 'published' ? 'unpublished' : 'published'} successfully`,
    });
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedSermons.length === 0) return;

    const updatedSermons = sermons.map(sermon => {
      if (selectedSermons.includes(sermon.id)) {
        return {
          ...sermon,
          status: bulkAction === "publish" ? "published" : "draft"
        };
      }
      return sermon;
    });

    setSermons(updatedSermons);
    localStorage.setItem('sermons', JSON.stringify(updatedSermons));
    setSelectedSermons([]);
    setBulkAction("");
    
    toast({
      description: `Selected sermons ${bulkAction === "publish" ? "published" : "unpublished"} successfully`,
    });
  };

  const handleRowClick = (id: string) => {
    navigate(`/sermons/${id}/edit`);
  };

  return (
    <div className="mobile-spacing">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Sermons</h1>
        <Button
          onClick={() => navigate("/sermons/create")}
          className="bg-[#695CAE] hover:bg-[#695CAE]/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Sermon
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search sermons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4"
            />
          </div>
        </div>
      </div>

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={filteredSermons}
          columns={[
            { 
              header: "Title", 
              accessor: "title",
              className: "font-medium"
            },
            { 
              header: "Preacher", 
              accessor: "preacher"
            },
            { 
              header: "Published Date", 
              accessor: "publishDate"
            },
            { 
              header: "Status", 
              accessor: (sermon: any) => (
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sermon.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {sermon.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
              )
            }
          ]}
          selectedItems={selectedSermons}
          onSelectItem={(id, checked) => {
            setSelectedSermons(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedSermons(checked ? filteredSermons.map(s => s.id) : []);
          }}
          getItemId={(item) => item.id}
          showCheckboxes={true}
          actions={{
            onDelete: handleDelete,
            onStatusChange: handleStatusChange,
            onViewDetails: handleViewDetails
          }}
          CardComponent={SermonCard}
          bulkActions={[
            { value: "publish", label: "Publish" },
            { value: "unpublish", label: "Unpublish" }
          ]}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
          onRowClick={handleRowClick}
        />
      </div>

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Sermon Details"
        data={selectedSermon}
        onStatusChange={(id) => selectedSermon?.id && handleStatusChange(selectedSermon.id, selectedSermon.status)}
        statusLabels={{
          pending: 'Draft',
          completed: 'Published',
          buttonText: 'Publish'
        }}
      />
    </div>
  );
}