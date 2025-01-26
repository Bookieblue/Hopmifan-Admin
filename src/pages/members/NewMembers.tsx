import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { FilterModal } from "@/components/members/FilterModal";
import { DetailsModal } from "@/components/shared/DetailsModal";
import { useToast } from "@/hooks/use-toast";
import { BulkActions } from "@/components/shared/BulkActions";
import { ViewDetailsButton } from "@/components/shared/ViewDetailsButton";

export default function NewMembers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [members, setMembers] = useState([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      location: "New York",
      status: "pending",
      joinDate: "2024-01-15",
      message: "I would like to join the church and serve in the choir ministry.",
      country: "United States",
      cityState: "New York, NY",
      preferredContact: "email"
    },
  ]);

  const handleViewDetails = (id: string) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setSelectedMember(member);
      setDetailsModalOpen(true);
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedMember) {
      setMembers(members.map(member => 
        member.id === selectedMember.id 
          ? { ...member, status }
          : member
      ));
      setDetailsModalOpen(false);
      toast({
        description: `Member ${status === 'completed' ? 'approved' : 'pending'}`,
      });
    }
  };

  const columns = [
    { 
      header: "Name", 
      accessor: (member: any) => (
        <div>
          <div className="font-medium">{`${member.firstName} ${member.lastName}`}</div>
          <div className="text-sm text-gray-500">{member.email}</div>
        </div>
      )
    },
    { 
      header: "Contact Info", 
      accessor: (member: any) => (
        <div>
          <div>{member.phone}</div>
          <div className="text-sm text-gray-500 capitalize">{member.preferredContact} preferred</div>
        </div>
      )
    },
    { 
      header: "Location", 
      accessor: (member: any) => (
        <div>
          <div>{member.country}</div>
          <div className="text-sm text-gray-500">{member.cityState}</div>
        </div>
      )
    },
    {
      header: "Status & Date",
      accessor: (member: any) => (
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            member.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {member.status === 'completed' ? 'Approved' : 'Pending'}
          </span>
          <div className="text-sm text-gray-500 mt-1">{member.joinDate}</div>
        </div>
      )
    }
  ];

  const handleBulkAction = () => {
    if (!bulkAction || selectedMembers.length === 0) return;

    const updatedMembers = [...members];
    
    switch (bulkAction) {
      case "approve":
        selectedMembers.forEach(id => {
          const memberIndex = updatedMembers.findIndex(m => m.id === id);
          if (memberIndex !== -1) {
            updatedMembers[memberIndex] = {
              ...updatedMembers[memberIndex],
              status: "completed"
            };
          }
        });
        toast({
          description: `${selectedMembers.length} members approved`,
        });
        break;
      case "pending":
        selectedMembers.forEach(id => {
          const memberIndex = updatedMembers.findIndex(m => m.id === id);
          if (memberIndex !== -1) {
            updatedMembers[memberIndex] = {
              ...updatedMembers[memberIndex],
              status: "pending"
            };
          }
        });
        toast({
          description: `${selectedMembers.length} members marked as pending`,
        });
        break;
    }
    
    setMembers(updatedMembers);
    setSelectedMembers([]);
    setBulkAction("");
  };

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

      <div className="bg-white rounded-lg border">
        <DataTable
          data={members}
          columns={columns}
          selectedItems={selectedMembers}
          onSelectItem={(id, checked) => {
            setSelectedMembers(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedMembers(checked ? members.map(m => m.id) : []);
          }}
          getItemId={(item) => item.id}
          onRowClick={(id) => handleViewDetails(id)}
          showCheckboxes={true}
          actions={{
            onViewDetails: handleViewDetails
          }}
          CardComponent={({ item }) => (
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base mb-1">{`${item.firstName} ${item.lastName}`}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.email}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.joinDate}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'completed' ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                </div>
                <ViewDetailsButton onClick={() => handleViewDetails(item.id)} />
              </div>
            </div>
          )}
        />

        {selectedMembers.length > 0 && (
          <BulkActions
            selectedCount={selectedMembers.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "approve", label: "Approve Selected" },
              { value: "pending", label: "Mark as Pending" }
            ]}
          />
        )}
      </div>

      <FilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueLocations={Array.from(new Set(members.map((member) => member.location)))}
      />

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Member Details"
        data={selectedMember}
        onStatusChange={handleStatusChange}
        statusLabels={{
          pending: 'Pending',
          completed: 'Contacted',
          buttonText: 'Mark as Contacted'
        }}
      />
    </div>
  );
}
