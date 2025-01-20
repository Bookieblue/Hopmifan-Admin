import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { FilterModal } from "@/components/members/FilterModal";

export default function NewMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  // Sample data
  const members = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      location: "New York",
      status: "pending",
      joinDate: "2024-01-15",
    },
    // Add more sample data as needed
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);

    const matchesLocation = locationFilter === "all" || member.location === locationFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    const matchesDate = !dateFilter || member.joinDate === dateFilter;

    return matchesSearch && matchesLocation && matchesStatus && matchesDate;
  });

  const uniqueLocations = Array.from(new Set(members.map((member) => member.location)));

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Members</h1>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search members..."
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

      <DataTable
        data={filteredMembers}
        columns={[
          { 
            header: "Name", 
            accessor: "name",
            className: "text-[14px]"
          },
          { 
            header: "Email", 
            accessor: "email",
            className: "text-[14px]"
          },
          { 
            header: "Phone", 
            accessor: "phone",
            className: "text-[14px]"
          },
          { 
            header: "Location", 
            accessor: "location",
            className: "text-[14px]"
          },
          {
            header: "Status",
            accessor: (member) => (
              <span className={`px-2 py-1 rounded-full text-xs ${
                member.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {member.status}
              </span>
            ),
            className: "text-[14px]"
          },
          {
            header: "Join Date",
            accessor: "joinDate",
            className: "text-[14px]"
          }
        ]}
        selectedItems={[]}
        onSelectItem={() => {}}
        onSelectAll={() => {}}
        getItemId={(item) => item.id}
        showCheckboxes={false}
      />

      <FilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueLocations={uniqueLocations}
      />
    </div>
  );
}
