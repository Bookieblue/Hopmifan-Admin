import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ContactFilterModal } from "@/components/contacts/FilterModal";
import { DetailsModal } from "@/components/shared/DetailsModal";
import { BulkActions } from "@/components/shared/BulkActions";
import { useToast } from "@/hooks/use-toast";

const sampleContacts = [
  {
    id: "1",
    firstName: "Oluwaseun",
    lastName: "Adebayo",
    phone: "+234 801 234 5678",
    email: "oluwaseun.adebayo@gmail.com",
    country: "Nigeria",
    cityState: "Lagos, LA",
    preferredContact: "whatsapp",
    message: "I would like to join the church choir ministry. When are the rehearsals scheduled?",
    dateSubmitted: new Date(2024, 2, 15).toLocaleDateString(),
    status: "pending"
  },
  {
    id: "2",
    firstName: "Chioma",
    lastName: "Okonkwo",
    phone: "+234 802 345 6789",
    email: "chioma.okonkwo@yahoo.com",
    country: "Nigeria",
    cityState: "Abuja, FC",
    preferredContact: "phone",
    message: "God bless you. I'm interested in the youth fellowship program. Please provide more information.",
    dateSubmitted: new Date(2024, 2, 14).toLocaleDateString(),
    status: "replied"
  }
];

export default function ContactMessages() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [contacts, setContacts] = useState(sampleContacts);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");

  const columns = [
    { 
      header: "Name", 
      accessor: (contact: any) => (
        <div>
          <div className="font-medium">{`${contact.firstName} ${contact.lastName}`}</div>
          <div className="text-sm text-gray-500">{contact.email}</div>
        </div>
      )
    },
    { 
      header: "Contact Info", 
      accessor: (contact: any) => (
        <div>
          <div>{contact.phone}</div>
          <div className="text-sm text-gray-500 capitalize">{contact.preferredContact} preferred</div>
        </div>
      )
    },
    { 
      header: "Location", 
      accessor: (contact: any) => (
        <div>
          <div>{contact.country}</div>
          <div className="text-sm text-gray-500">{contact.cityState}</div>
        </div>
      )
    },
    { 
      header: "Status & Date", 
      accessor: (contact: any) => (
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            contact.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {contact.status === 'replied' ? 'Replied' : 'Pending'}
          </span>
          <div className="text-sm text-gray-500 mt-1">{contact.dateSubmitted}</div>
        </div>
      )
    },
  ];

  const handleStatusChange = (status: string) => {
    if (selectedContact) {
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, status }
          : contact
      ));
      setDetailsModalOpen(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === 'all' || contact.country === countryFilter;
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    const matchesDate = !dateFilter || contact.dateSubmitted === dateFilter;
    
    return matchesSearch && matchesCountry && matchesStatus && matchesDate;
  });

  const handleRowClick = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      setSelectedContact(contact);
      setDetailsModalOpen(true);
    }
  };

  const handleCardClick = (contact: any) => {
    setSelectedContact(contact);
    setDetailsModalOpen(true);
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedContacts.length === 0) return;

    switch (bulkAction) {
      case "markReplied":
        toast({
          description: `${selectedContacts.length} messages marked as replied`,
        });
        break;
      case "markPending":
        toast({
          description: `${selectedContacts.length} messages marked as pending`,
        });
        break;
      case "delete":
        toast({
          description: `${selectedContacts.length} messages deleted`,
        });
        break;
    }
    setSelectedContacts([]);
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
              placeholder="Search contacts..."
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

      <ContactFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueCountries={Array.from(new Set(contacts.map(contact => contact.country)))}
      />

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Contact Details"
        data={selectedContact}
        onStatusChange={handleStatusChange}
        statusLabels={{
          pending: 'Pending',
          completed: 'Replied',
          buttonText: 'Mark as Replied'
        }}
      />

      <div className="bg-white md:rounded-lg md:border">
        <div className="md:hidden flex justify-between items-center px-4 py-2 bg-gray-50 border-b">
          <h2 className="font-medium text-sm text-gray-600">Member</h2>
          <h2 className="font-medium text-sm text-gray-600">Status</h2>
        </div>
        <DataTable
          data={filteredContacts}
          columns={columns}
          selectedItems={selectedContacts}
          onSelectItem={(id, checked) => {
            setSelectedContacts(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedContacts(checked ? filteredContacts.map(c => c.id) : []);
          }}
          getItemId={(item) => item.id}
          onRowClick={handleCardClick}
          showCheckboxes={true}
          CardComponent={({ item }) => (
            <div 
              className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleCardClick(item)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{`${item.firstName} ${item.lastName}`}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'replied' ? 'Replied' : 'Pending'}
                </span>
              </div>
            </div>
          )}
          bulkActions={[
            { value: "markReplied", label: "Mark as Replied" },
            { value: "markPending", label: "Mark as Pending" },
            { value: "delete", label: "Delete Selected" }
          ]}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />

        {selectedContacts.length > 0 && (
          <BulkActions
            selectedCount={selectedContacts.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "markReplied", label: "Mark as Replied" },
              { value: "markPending", label: "Mark as Pending" },
              { value: "delete", label: "Delete Selected" }
            ]}
          />
        )}
      </div>
    </div>
  );
}
