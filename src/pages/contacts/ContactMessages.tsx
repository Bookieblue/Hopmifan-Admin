import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { ContactFilterModal } from "@/components/contacts/FilterModal";
import { ContactDetailsModal } from "@/components/contacts/ContactDetailsModal";
import { BulkActions } from "@/components/shared/BulkActions";
import { useToast } from "@/hooks/use-toast";

export default function ContactMessages() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      message: "Hello, I need assistance.",
      status: "pending",
      date: "2024-01-15",
      country: "USA"
    },
  ]);

  const handleViewDetails = (id: string) => {
    const message = messages.find(m => m.id === id);
    if (message) {
      setSelectedMessage(message);
      setDetailsModalOpen(true);
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedMessage) {
      setMessages(messages.map(message => 
        message.id === selectedMessage.id 
          ? { ...message, status }
          : message
      ));
      setDetailsModalOpen(false);
      toast({
        description: `Message marked as ${status}`,
      });
    }
  };

  const columns = [
    { 
      header: "Name", 
      accessor: (message: any) => (
        <div>
          <div className="font-medium">{`${message.firstName} ${message.lastName}`}</div>
          <div className="text-sm text-gray-500">{message.email}</div>
        </div>
      )
    },
    { 
      header: "Contact Info", 
      accessor: (message: any) => (
        <div>
          <div>{message.phone}</div>
          <div className="text-sm text-gray-500">{message.country}</div>
        </div>
      )
    },
    { 
      header: "Status & Date", 
      accessor: (message: any) => (
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            message.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {message.status === 'completed' ? 'Responded' : 'Pending'}
          </span>
          <div className="text-sm text-gray-500 mt-1">{message.date}</div>
        </div>
      )
    }
  ];

  const handleBulkAction = () => {
    if (!bulkAction || selectedMessages.length === 0) return;

    const updatedMessages = [...messages];
    
    switch (bulkAction) {
      case "markResponded":
        selectedMessages.forEach(id => {
          const messageIndex = updatedMessages.findIndex(m => m.id === id);
          if (messageIndex !== -1) {
            updatedMessages[messageIndex] = {
              ...updatedMessages[messageIndex],
              status: "completed"
            };
          }
        });
        toast({
          description: `${selectedMessages.length} messages marked as responded`,
        });
        break;
      case "markPending":
        selectedMessages.forEach(id => {
          const messageIndex = updatedMessages.findIndex(m => m.id === id);
          if (messageIndex !== -1) {
            updatedMessages[messageIndex] = {
              ...updatedMessages[messageIndex],
              status: "pending"
            };
          }
        });
        toast({
          description: `${selectedMessages.length} messages marked as pending`,
        });
        break;
    }
    
    setMessages(updatedMessages);
    setSelectedMessages([]);
    setBulkAction("");
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={messages}
          columns={columns}
          selectedItems={selectedMessages}
          onSelectItem={(id, checked) => {
            setSelectedMessages(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedMessages(checked ? messages.map(m => m.id) : []);
          }}
          getItemId={(item) => item.id}
          onRowClick={(id) => handleViewDetails(id)}
          showCheckboxes={true}
          CardComponent={({ item }) => (
            <div className="p-4 border-b last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{`${item.firstName} ${item.lastName}`}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'completed' ? 'Responded' : 'Pending'}
                </span>
              </div>
              <div className="text-sm mb-2">
                <p>{item.phone}</p>
                <p className="text-gray-500">{item.country}</p>
              </div>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          )}
        />

        {selectedMessages.length > 0 && (
          <BulkActions
            selectedCount={selectedMessages.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "markResponded", label: "Mark as Responded" },
              { value: "markPending", label: "Mark as Pending" }
            ]}
          />
        )}
      </div>

      <ContactFilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueCountries={Array.from(new Set(messages.map(message => message.country)))}
      />

      <ContactDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        message={selectedMessage}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
