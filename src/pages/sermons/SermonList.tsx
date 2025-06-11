import { useState } from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DetailsModal } from '@/components/shared/DetailsModal';
import { useToast } from '@/hooks/use-toast';
import { SermonCard } from '@/components/sermons/SermonCard';
import { useNavigate } from 'react-router-dom';
import { useGetSermons } from '@/hooks/services/sermons/hook';

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  createdAt: string;
  status: 'publish' | 'unpublish';
  description: string;
  youtubeLink: string;
}

type TableItem = {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  status: 'publish' | 'unpublish';
  description?: string;
};

export default function SermonList() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedSermons, setSelectedSermons] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');
  const { data: sermonListResponse, isLoading } = useGetSermons();

  const sermons = sermonListResponse?.data.sermons || [];

  const filteredSermons = sermons
    .filter(sermon => {
      return (
        sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .map(sermon => ({
      id: sermon.id,
      title: sermon.title,
      author: sermon.preacher,
      publishDate: new Date(sermon.createdAt).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: sermon.status,
      description: sermon.description,
    }));

  const handleViewDetails = (id: string) => {
    const sermon = sermons.find(s => s.id === id);
    if (sermon) {
      setSelectedSermon({
        ...sermon,
        youtubeLink: sermon.link, // Map the 'link' field to 'youtubeLink' to match the Sermon interface
      });
      setDetailsModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete API call
    toast({
      description: 'Sermon deleted successfully',
    });
  };

  const handleStatusChange = (id: string, currentStatus: string) => {
    // TODO: Implement status change API call
    toast({
      description: `Sermon ${
        currentStatus === 'publish' ? 'unpublished' : 'published'
      } successfully`,
    });
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedSermons.length === 0) return;
    // TODO: Implement bulk actions API call
    setSelectedSermons([]);
    setBulkAction('');

    toast({
      description: `Selected sermons ${
        bulkAction === 'publish' ? 'published' : 'unpublished'
      } successfully`,
    });
  };

  const handleRowClick = (id: string) => {
    navigate(`/sermons/${id}/edit`);
  };

  if (isLoading) {
    return <div className="mobile-spacing">Loading...</div>;
  }

  return (
    <div className="mobile-spacing">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Sermons</h1>
        <Button
          onClick={() => navigate('/sermons/create')}
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
              onChange={e => setSearchQuery(e.target.value)}
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
              header: 'Title',
              accessor: (item: TableItem) => item.title,
              className: 'font-medium',
            },
            {
              header: 'Preacher',
              accessor: (item: TableItem) => item.author,
            },
            {
              header: 'Published Date',
              accessor: (item: TableItem) => item.publishDate,
            },
            {
              header: 'Status',
              accessor: (item: TableItem) => (
                <div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'publish'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {item.status === 'publish' ? 'Published' : 'Unpublished'}
                  </span>
                </div>
              ),
            },
          ]}
          selectedItems={selectedSermons}
          onSelectItem={(id, checked) => {
            setSelectedSermons(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={checked => {
            setSelectedSermons(checked ? filteredSermons.map(s => s.id) : []);
          }}
          getItemId={(item: TableItem) => item.id}
          showCheckboxes={true}
          actions={{
            onDelete: handleDelete,
            onStatusChange: handleStatusChange,
            onViewDetails: handleViewDetails,
          }}
          CardComponent={SermonCard}
          bulkActions={[
            { value: 'publish', label: 'Publish' },
            { value: 'unpublish', label: 'Unpublish' },
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
        onStatusChange={id =>
          selectedSermon?.id &&
          handleStatusChange(selectedSermon.id, selectedSermon.status)
        }
        statusLabels={{
          pending: 'Draft',
          completed: 'Published',
          buttonText: 'Publish',
        }}
      />
    </div>
  );
}
