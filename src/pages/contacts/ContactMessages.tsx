import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ContactFilterModal } from "@/components/contacts/FilterModal";

const sampleContacts = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 234 567 8900",
    email: "john.doe@example.com",
    country: "United States",
    cityState: "New York, NY",
    preferredContact: "email",
    message: "I'm interested in your services",
    dateSubmitted: new Date(2024, 2, 15).toLocaleDateString(),
    status: "pending"
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1 234 567 8901",
    email: "jane.smith@example.com",
    country: "Canada",
    cityState: "Toronto, ON",
    preferredContact: "phone",
    message: "Please contact me regarding your products",
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
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [contacts, setContacts] = useState(sampleContacts);
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
          <div className="text-sm text-gray-500">{contact.preferredContact === 'email' ? 'Prefers Email' : 'Prefers Phone'}</div>
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

  const handleMarkAsReplied = (contactId: string) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId 
        ? { ...contact, status: 'replied' }
        : contact
    ));
    toast({
      description: "Contact marked as replied"
    });
  };

  const handleBulkAction = () => {
    if (bulkAction === 'markReplied') {
      setContacts(contacts.map(contact => 
        selectedContacts.includes(contact.id)
          ? { ...contact, status: 'replied' }
          : contact
      ));
      toast({
        description: `${selectedContacts.length} contacts marked as replied`
      });
      setSelectedContacts([]);
    }
    setBulkAction("");
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

  const uniqueCountries = Array.from(new Set(contacts.map(contact => contact.country)));

  const bulkActions = [
    { value: "markReplied", label: "Mark as Replied" },
  ];

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
        uniqueCountries={uniqueCountries}
      />

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={filteredContacts}
          columns={columns}
          selectedItems={selectedContacts}
          onSelectItem={(id, checked) => {
            if (checked) {
              setSelectedContacts([...selectedContacts, id]);
            } else {
              setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
            }
          }}
          onSelectAll={(checked) => {
            if (checked) {
              setSelectedContacts(filteredContacts.map(contact => contact.id));
            } else {
              setSelectedContacts([]);
            }
          }}
          getItemId={(item) => item.id}
          actions={{
            onEdit: handleMarkAsReplied,
          }}
          bulkActions={bulkActions}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />
      </div>
    </div>
  );
}