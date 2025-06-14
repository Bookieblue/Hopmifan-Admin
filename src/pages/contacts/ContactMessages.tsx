import { useState } from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ContactFilterModal } from '@/components/contacts/FilterModal';
import { DetailsModal } from '@/components/shared/DetailsModal';
import { BulkActions } from '@/components/shared/BulkActions';
import { ViewDetailsButton } from '@/components/shared/ViewDetailsButton';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/components/utils/formatDate';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  methodOfContact: string;
  country: string;
  cityAndState: string;
  status: 'replied' | 'pending';
  createdAt: string;
}

export default function ContactMessages() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  // const [contacts, setContacts] = useState(sampleContacts);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');

  const backendURL = import.meta.env.VITE_PUBLIC_API_BASE_URL || '';

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `${backendURL}/api/contact-us?page=1&limit=20`
      );
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const result = await response.json();

      return Array.isArray(result.data?.contacts)
        ? result.data.contacts.map(contact => ({
            ...contact,
            status: contact.replied ? 'completed' : 'pending',
          }))
        : [];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  };

  const {
    data: contacts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  const columns = [
    {
      header: 'Name',
      accessor: (contact: Contact) => (
        <div>
          <div className="font-medium">{`${contact.firstName} ${contact.lastName}`}</div>
          <div className="text-sm text-gray-500">{contact.email}</div>
        </div>
      ),
    },
    {
      header: 'Contact Info',
      accessor: (contact: Contact) => (
        <div>
          <div>{contact.phoneNumber}</div>
          <div className="text-sm text-gray-500 capitalize">
            {contact.methodOfContact} preferred
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      accessor: (contact: Contact) => (
        <div>
          <div>{contact.country}</div>
          <div className="text-sm text-gray-500">{contact.cityAndState}</div>
        </div>
      ),
    },
    {
      header: 'Status & Date',
      accessor: (contact: Contact) => (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              contact.status === 'replied'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {contact.status === 'replied' ? 'Replied' : 'Pending'}
          </span>
          <div className="text-sm text-gray-500 mt-1">
            {formatDate(contact.createdAt)}
          </div>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (contact: Contact) => (
        <div
          className="flex items-center justify-end gap-2 text-[14px]"
          onClick={e => e.stopPropagation()}
        >
          <ViewDetailsButton onClick={() => handleViewDetails(contact.id)} />
        </div>
      ),
    },
  ];

  const handleViewDetails = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      setSelectedContact(contact);
      setDetailsModalOpen(true);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.cityAndState.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry =
      countryFilter === 'all' || contact.country === countryFilter;
    const matchesStatus =
      statusFilter === 'all' || contact.status === statusFilter;
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

  const handleStatusChange = (status: string) => {
    if (selectedContact) {
      // setContacts(contacts.map(contact =>
      //   contact.id === selectedContact.id
      //     ? { ...contact, status }
      //     : contact
      // ));
      setDetailsModalOpen(false);
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedContacts.length === 0) return;

    const updatedContacts = [...contacts];

    switch (bulkAction) {
      case 'markReplied':
        selectedContacts.forEach(id => {
          const contactIndex = updatedContacts.findIndex(c => c.id === id);
          if (contactIndex !== -1) {
            updatedContacts[contactIndex] = {
              ...updatedContacts[contactIndex],
              status: 'replied',
            };
          }
        });
        toast({
          description: `${selectedContacts.length} contacts marked as replied`,
        });
        break;
      case 'markPending':
        selectedContacts.forEach(id => {
          const contactIndex = updatedContacts.findIndex(c => c.id === id);
          if (contactIndex !== -1) {
            updatedContacts[contactIndex] = {
              ...updatedContacts[contactIndex],
              status: 'pending',
            };
          }
        });
        toast({
          description: `${selectedContacts.length} contacts marked as pending`,
        });
        break;
    }

    // setContacts(updatedContacts);
    setSelectedContacts([]);
    setBulkAction('');
  };

  return (
    <div className="mobile-spacing">
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
              onChange={e => setSearchQuery(e.target.value)}
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

      <div className="bg-white md:rounded-lg md:border overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center p-6">
            <span className="animate-spin border-4 border-gray-300 border-t-gray-600 rounded-full w-6 h-6"></span>
            <span className="ml-3 text-gray-600">
              Loading contact messages...
            </span>
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 p-6">
            Failed to load contact messages. Please try again.
          </div>
        ) : (
          <DataTable
            data={filteredContacts}
            columns={columns}
            selectedItems={selectedContacts}
            onSelectItem={(id, checked) => {
              setSelectedContacts(prev =>
                checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
              );
            }}
            onSelectAll={checked => {
              setSelectedContacts(
                checked ? filteredContacts.map(c => c.id) : []
              );
            }}
            getItemId={item => item.id}
            onRowClick={handleRowClick}
            showCheckboxes={true}
            CardComponent={({ item }) => (
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-base mb-1">{`${item.firstName} ${item.lastName}`}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.email}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {formatDate(item.createdAt)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.status === 'replied'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.status === 'replied' ? 'Replied' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  <ViewDetailsButton
                    onClick={() => handleViewDetails(item.id)}
                  />
                </div>
              </div>
            )}
            actions={{
              onViewDetails: handleViewDetails,
            }}
          />
        )}

        {selectedContacts.length > 0 && (
          <BulkActions
            selectedCount={selectedContacts.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: 'markReplied', label: 'Mark as Replied' },
              { value: 'markPending', label: 'Mark as Pending' },
            ]}
          />
        )}
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
        uniqueCountries={Array.from(
          new Set(contacts.map(contact => contact.country))
        )}
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
          buttonText: 'Mark as Replied',
        }}
      />
    </div>
  );
}
