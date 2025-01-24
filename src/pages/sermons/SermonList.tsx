import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DetailsModal } from "@/components/shared/DetailsModal";
import { useToast } from "@/hooks/use-toast";

interface SermonData {
  title: string;
  description: string;
  author: string;
  youtubeLink: string;
  publishDate: string;
  status: string;
  thumbnailImage: string;
  preacher?: string; // Made optional since it might not always be present
}

const sampleSermons: SermonData[] = [
  {
    title: "The Power of Faith",
    description: "A deep dive into the importance of faith in our lives.",
    author: "Pastor John",
    youtubeLink: "https://youtube.com/example1",
    publishDate: "2024-01-01",
    status: "published",
    thumbnailImage: "https://example.com/image1.jpg",
    preacher: "Pastor John"
  },
  {
    title: "Hope in Difficult Times",
    description: "Finding hope during challenging moments.",
    author: "Pastor Jane",
    youtubeLink: "https://youtube.com/example2",
    publishDate: "2024-01-15",
    status: "published",
    thumbnailImage: "https://example.com/image2.jpg",
    preacher: "Pastor Jane"
  }
];

export default function SermonList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [sermons, setSermons] = useState(sampleSermons);
  const [selectedSermon, setSelectedSermon] = useState<SermonData | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const filteredSermons = sermons.filter(sermon => {
    return (
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleViewDetails = (id: string) => {
    const sermon = sermons.find(s => s.title === id);
    if (sermon) {
      setSelectedSermon(sermon);
      setDetailsModalOpen(true);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Sermon List</h1>
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
        </div>
      </div>

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={filteredSermons}
          columns={[
            { 
              header: "Title", 
              accessor: (sermon: SermonData) => (
                <div className="font-medium">{sermon.title}</div>
              )
            },
            { 
              header: "Author", 
              accessor: (sermon: SermonData) => (
                <div>{sermon.author}</div>
              )
            },
            { 
              header: "Published Date", 
              accessor: (sermon: SermonData) => (
                <div>{sermon.publishDate}</div>
              )
            },
            { 
              header: "Status", 
              accessor: (sermon: SermonData) => (
                <div>{sermon.status}</div>
              )
            },
            {
              header: "Actions",
              accessor: (sermon: SermonData) => (
                <div className="flex items-center justify-end gap-2">
                  <Button onClick={() => handleViewDetails(sermon.title)} className="text-[#9b87f5] text-sm hover:underline">
                    See details
                  </Button>
                </div>
              )
            }
          ]}
          getItemId={(item) => item.title}
          showCheckboxes={false}
        />
      </div>

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Sermon Details"
        data={selectedSermon}
      />
    </div>
  );
}
