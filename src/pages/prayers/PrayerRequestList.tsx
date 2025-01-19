import { useState } from "react";
import { DataTable, type TableColumn } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { PrayerRequest } from "@/types/prayer";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function PrayerRequestList() {
  const navigate = useNavigate();
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);

  // Mock data for demonstration
  const prayerRequests: PrayerRequest[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      country: "United States",
      city: "New York",
      state: "NY",
      preferredContact: "email",
      request: "Please pray for my family's health and well-being.",
      dateSubmitted: new Date().toISOString(),
      status: "new"
    },
    // Add more mock data as needed
  ];

  const columns: TableColumn<PrayerRequest>[] = [
    {
      header: "Name",
      accessor: (request) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {request.firstName} {request.lastName}
          </span>
          <span className="text-sm text-gray-500">
            {format(new Date(request.dateSubmitted), "MMM d, yyyy")}
          </span>
        </div>
      )
    },
    {
      header: "Contact",
      accessor: (request) => (
        <div className="flex flex-col">
          <span>{request.email}</span>
          <span className="text-sm text-gray-500">{request.phone}</span>
        </div>
      )
    },
    {
      header: "Location",
      accessor: (request) => (
        <div className="flex flex-col">
          <span>{request.city}, {request.state}</span>
          <span className="text-sm text-gray-500">{request.country}</span>
        </div>
      )
    },
    {
      header: "Request",
      accessor: (request) => (
        <div className="max-w-md truncate">
          {request.request}
        </div>
      )
    },
    {
      header: "Status",
      accessor: (request) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          request.status === 'new' ? 'bg-blue-100 text-blue-800' :
          request.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      )
    }
  ];

  const handleSelectRequest = (id: string, checked: boolean) => {
    setSelectedRequests(prev =>
      checked ? [...prev, id] : prev.filter(requestId => requestId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRequests(checked ? prayerRequests.map(request => request.id) : []);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log("Delete prayer request:", id);
  };

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Prayer Requests</h1>
        <Button onClick={() => navigate("/prayers/create")}>
          New Prayer Request
        </Button>
      </div>

      <DataTable
        data={prayerRequests}
        columns={columns}
        selectedItems={selectedRequests}
        onSelectItem={handleSelectRequest}
        onSelectAll={handleSelectAll}
        getItemId={(request) => request.id}
        onRowClick={(id) => navigate(`/prayers/${id}`)}
        actions={{
          onDelete: handleDelete,
        }}
      />
    </div>
  );
}