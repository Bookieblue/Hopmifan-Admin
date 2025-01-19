import { useState } from "react";
import { Mail, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import { DataTable, TableColumn } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/types/contact";

const mockContacts: Contact[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1234567890",
    email: "john@example.com",
    country: "USA",
    cityState: "New York, NY",
    preferredContact: "email",
    message: "I would like to learn more about your services.",
    dateSubmitted: "2024-03-15T10:00:00Z",
    replied: false,
  },
  // Add more mock data as needed
];

export default function ContactList() {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);

  const columns: TableColumn<Contact>[] = [
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Phone", accessor: "phoneNumber" },
    { header: "Email", accessor: "email" },
    { header: "Country", accessor: "country" },
    { header: "City & State", accessor: "cityState" },
    { 
      header: "Preferred Contact", 
      accessor: (contact) => (
        <span className="capitalize">{contact.preferredContact}</span>
      )
    },
    { 
      header: "Status", 
      accessor: (contact) => (
        <Badge variant={contact.replied ? "default" : "secondary"}>
          {contact.replied ? "Replied" : "Pending"}
        </Badge>
      )
    },
    {
      header: "Date Submitted",
      accessor: (contact) => format(new Date(contact.dateSubmitted), "MMM dd, yyyy"),
    },
  ];

  const handleMarkAsReplied = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, replied: true } : contact
    ));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Contact Inquiries</h1>
        <p className="text-gray-500">Manage and respond to contact form submissions</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <DataTable
        data={contacts}
        columns={columns}
        selectedItems={selectedContacts}
        onSelectItem={(id, checked) => {
          setSelectedContacts(prev =>
            checked ? [...prev, id] : prev.filter(item => item !== id)
          );
        }}
        onSelectAll={(checked) => {
          setSelectedContacts(checked ? contacts.map(c => c.id) : []);
        }}
        getItemId={(item) => item.id}
        actions={{
          onShare: (id) => {
            console.log("Share contact:", id);
          },
          additionalActions: [
            {
              label: "Mark as Replied",
              onClick: handleMarkAsReplied,
            },
          ],
        }}
      />
    </div>
  );
}
