import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Sermon } from "@/types/sermon";

export default function SermonList() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");

  // Mock data - replace with actual data fetching
  const sermons: Sermon[] = [
    {
      id: "1",
      title: "Sunday Service - The Power of Faith",
      date: "2024-03-10",
      youtubeLink: "https://youtube.com/watch?v=example1",
      thumbnailUrl: "/placeholder.svg",
      isPublished: true,
    },
    {
      id: "2",
      title: "Wednesday Bible Study - Prayer",
      date: "2024-03-13",
      youtubeLink: "https://youtube.com/watch?v=example2",
      thumbnailUrl: "/placeholder.svg",
      isPublished: false,
    },
  ];

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Date", accessor: "date" },
    { 
      header: "Status", 
      accessor: (sermon: Sermon) => (
        <Badge variant={sermon.isPublished ? "default" : "secondary"}>
          {sermon.isPublished ? "Published" : "Draft"}
        </Badge>
      )
    },
    { 
      header: "YouTube Link", 
      accessor: (sermon: Sermon) => (
        <a 
          href={sermon.youtubeLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View
        </a>
      )
    },
  ];

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedItems(prev =>
      checked ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? sermons.map(sermon => sermon.id) : []);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Sermons</h1>
        <Link to="/sermons/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Sermon
          </Button>
        </Link>
      </div>

      <DataTable
        data={sermons}
        columns={columns}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        getItemId={(item) => item.id}
        onRowClick={(id) => `/sermons/${id}/edit`}
        actions={{
          onDelete: (id) => {
            console.log("Delete sermon:", id);
          },
          additionalActions: [
            {
              label: "Toggle Publish",
              onClick: (id) => {
                console.log("Toggle publish:", id);
              },
            },
          ],
        }}
        bulkActions={[
          { value: "delete", label: "Delete Selected" },
          { value: "publish", label: "Publish Selected" },
          { value: "unpublish", label: "Unpublish Selected" },
        ]}
        bulkAction={bulkAction}
        setBulkAction={setBulkAction}
        onBulkAction={() => {
          console.log("Bulk action:", bulkAction, "on", selectedItems);
        }}
      />
    </div>
  );
}