import { useState, useEffect } from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { EventFilterModal } from '@/components/registered-events/FilterModal';
import { DetailsModal } from '@/components/shared/DetailsModal';
import { BulkActions } from '@/components/shared/BulkActions';
import { useToast } from '@/hooks/use-toast';
import { ViewDetailsButton } from '@/components/shared/ViewDetailsButton';
import { useGetRegisteredEvents } from '@/hooks/services/event/hook';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  cityState: string;
  eventName: string;
  dateSubmitted: string;
  status: 'pending' | 'confirmed';
}

export default function RegisteredEvents() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistrations, setSelectedRegistrations] = useState<string[]>(
    []
  );
  const [bulkAction, setBulkAction] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data, isLoading, error } = useGetRegisteredEvents();

  useEffect(() => {
    if (data?.data?.events) {
      const transformedRegistrations = data.data.events.map(event => {
        const registration: Registration = {
          id: event.id,
          firstName: event.firstName,
          lastName: event.lastName,
          phone: event.phoneNumber,
          email: event.email,
          country: event.country,
          cityState: event.cityAndState,
          eventName: event.event.title,
          dateSubmitted: new Date(event.createdAt).toLocaleDateString(),
          status: 'pending',
        };
        return registration;
      });
      setRegistrations(transformedRegistrations);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-gray-500">Loading registrations...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-red-500">
            Error loading registrations. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  const handleConfirmBulkDelete = () => {
    if (selectedRegistrations.length === 0) return;

    const updatedRegistrations = registrations.filter(
      registration => !selectedRegistrations.includes(registration.id)
    );
    setRegistrations(updatedRegistrations);
    setSelectedRegistrations([]);
    setDeleteDialogOpen(false);
    toast({
      description: `${selectedRegistrations.length} registrations deleted successfully`,
    });
  };

  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch =
      `${registration.firstName} ${registration.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      registration.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry =
      countryFilter === 'all' || registration.country === countryFilter;
    const matchesStatus =
      statusFilter === 'all' || registration.status === statusFilter;
    const matchesDate =
      !dateFilter || registration.dateSubmitted === dateFilter;

    return matchesSearch && matchesCountry && matchesStatus && matchesDate;
  });

  const handleViewDetails = (id: string) => {
    const registration = registrations.find(r => r.id === id);
    if (registration) {
      setSelectedRegistration(registration);
      setDetailsModalOpen(true);
    }
  };

  const handleStatusChange = (status: string) => {
    const updatedRegistrations = registrations.map(registration => {
      if (registration.id === selectedRegistration?.id) {
        return {
          ...registration,
          status:
            status === 'confirmed'
              ? ('confirmed' as const)
              : ('pending' as const),
        };
      }
      return registration;
    });
    setRegistrations(updatedRegistrations);
    toast({
      description: `Registration status updated to ${status}`,
    });
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedRegistrations.length === 0) return;

    const updatedRegistrations = [...registrations];

    switch (bulkAction) {
      case 'markConfirmed':
        selectedRegistrations.forEach(id => {
          const index = updatedRegistrations.findIndex(reg => reg.id === id);
          if (index !== -1) {
            updatedRegistrations[index] = {
              ...updatedRegistrations[index],
              status: 'confirmed',
            };
          }
        });
        toast({
          description: `${selectedRegistrations.length} registrations marked as confirmed`,
        });
        break;

      case 'markPending':
        selectedRegistrations.forEach(id => {
          const index = updatedRegistrations.findIndex(reg => reg.id === id);
          if (index !== -1) {
            updatedRegistrations[index] = {
              ...updatedRegistrations[index],
              status: 'pending',
            };
          }
        });
        toast({
          description: `${selectedRegistrations.length} registrations marked as pending`,
        });
        break;
    }

    setRegistrations(updatedRegistrations);
    setSelectedRegistrations([]);
    setBulkAction('');
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Event Registrations
        </h1>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search registrations..."
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

      <div className="bg-white md:rounded-lg md:border">
        <DataTable
          data={filteredRegistrations}
          columns={[
            {
              header: 'Name',
              accessor: (registration: Registration) => (
                <div>
                  <div className="font-medium">{`${registration.firstName} ${registration.lastName}`}</div>
                  <div className="text-sm text-gray-500">
                    {registration.email}
                  </div>
                </div>
              ),
            },
            {
              header: 'Contact Info',
              accessor: (registration: Registration) => (
                <div>
                  <div>{registration.phone}</div>
                  <div className="text-sm text-gray-500">
                    {registration.eventName}
                  </div>
                </div>
              ),
            },
            {
              header: 'Location',
              accessor: (registration: Registration) => (
                <div>
                  <div>{registration.country}</div>
                  <div className="text-sm text-gray-500">
                    {registration.cityState}
                  </div>
                </div>
              ),
            },
            {
              header: 'Status & Date',
              accessor: (registration: Registration) => (
                <div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      registration.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {registration.status === 'confirmed'
                      ? 'Confirmed'
                      : 'Pending'}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">
                    {registration.dateSubmitted}
                  </div>
                </div>
              ),
            },
          ]}
          selectedItems={selectedRegistrations}
          onSelectItem={(id, checked) => {
            setSelectedRegistrations(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={checked => {
            setSelectedRegistrations(
              checked ? filteredRegistrations.map(r => r.id) : []
            );
          }}
          getItemId={item => item.id}
          showCheckboxes={true}
          CardComponent={({ item }) => (
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base mb-1">{`${item.firstName} ${item.lastName}`}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.email}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {item.dateSubmitted}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
                <ViewDetailsButton onClick={() => handleViewDetails(item.id)} />
              </div>
            </div>
          )}
          actions={{
            onViewDetails: handleViewDetails,
          }}
        />

        {selectedRegistrations.length > 0 && (
          <BulkActions
            selectedCount={selectedRegistrations.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: 'markConfirmed', label: 'Mark as Confirmed' },
              { value: 'markPending', label: 'Mark as Pending' },
            ]}
          />
        )}
      </div>

      <EventFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueCountries={Array.from(
          new Set(registrations.map(registration => registration.country))
        )}
      />

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Registration Details"
        data={selectedRegistration}
        onStatusChange={handleStatusChange}
        statusLabels={{
          pending: 'Pending',
          completed: 'Confirmed',
          buttonText: 'Confirm Registration',
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected registrations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
