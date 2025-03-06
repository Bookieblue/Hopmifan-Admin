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
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/components/utils/formatDate";

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

  const backendURL = import.meta.env.VITE_PUBLIC_API_BASE_URL || "";

  // Fetch members using TanStack Query

  const fetchMembers = async () => {
    const response = await fetch(`${backendURL}/api/members`);
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }
    const result = await response.json();

    // Ensure we return an array and map to update status dynamically
    return Array.isArray(result.data?.members)
      ? result.data.members.map((member) => ({
          ...member,
          status: member.replied ? "completed" : "pending",
        }))
      : [];
  };

  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  const handleViewDetails = (id: string) => {
    const member = members.find((m) => m.id === id);
    if (member) {
      setSelectedMember(member);
      setDetailsModalOpen(true);
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!selectedMember) return;
  
    try {
      const response = await fetch(`${backendURL}/api/members/${selectedMember.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "members": true }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update member status");
      }
  
      toast({
        description: `Member ${
          status === "completed" ? "approved" : "pending"
        } successfully updated.`,
      });
  
      setDetailsModalOpen(false);
    } catch (error) {
      toast({
        description: "An error occurred while updating status.",
        variant: "destructive",
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
      ),
    },
    {
      header: "Contact Info",
      accessor: (member: any) => (
        <div>
          <div>{member.phoneNumber}</div>
          <div className="text-sm text-gray-500 capitalize">
            {member.methodOfContact} preferred
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      accessor: (member: any) => (
        <div>
          <div>{member.country}</div>
          <div className="text-sm text-gray-500">{member.cityAndState}</div>
        </div>
      ),
    },
    {
      header: "Status & Date",
      accessor: (member: any) => (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              member.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {member.status === "completed" ? "Approved" : "Pending"}
          </span>
          <div className="text-sm text-gray-500 mt-1">
            {member.createdAt ? formatDate(member.createdAt) : "N/A"}
          </div>
        </div>
      ),
    },
  ];

  const handleBulkAction = () => {
    if (!bulkAction || selectedMembers.length === 0) return;

    const updatedMembers = [...members];

    switch (bulkAction) {
      case "approve":
        selectedMembers.forEach((id) => {
          const memberIndex = updatedMembers.findIndex((m) => m.id === id);
          if (memberIndex !== -1) {
            updatedMembers[memberIndex] = {
              ...updatedMembers[memberIndex],
              status: "completed",
            };
          }
        });
        toast({
          description: `${selectedMembers.length} members approved`,
        });
        break;
      case "pending":
        selectedMembers.forEach((id) => {
          const memberIndex = updatedMembers.findIndex((m) => m.id === id);
          if (memberIndex !== -1) {
            updatedMembers[memberIndex] = {
              ...updatedMembers[memberIndex],
              status: "pending",
            };
          }
        });
        toast({
          description: `${selectedMembers.length} members marked as pending`,
        });
        break;
    }

    // setMembers(updatedMembers);
    setSelectedMembers([]);
    setBulkAction("");
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      searchQuery === "" ||
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      locationFilter === "all" || member.country === locationFilter;

    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;

    const matchesDate =
      !dateFilter ||
      (member.createdAt &&
        formatDate(member.createdAt) === formatDate(dateFilter));

    return matchesSearch && matchesLocation && matchesStatus && matchesDate;
  });

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
        {isLoading ? (
          <div className="flex justify-center items-center p-6">
            <span className="animate-spin border-4 border-gray-300 border-t-gray-600 rounded-full w-6 h-6"></span>
            <span className="ml-3 text-gray-600">Loading members...</span>
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 p-6">
            Failed to load members. Please try again.
          </div>
        ) : (
          <DataTable
            data={filteredMembers}
            columns={columns}
            selectedItems={selectedMembers}
            onSelectItem={(id, checked) => {
              setSelectedMembers((prev) =>
                checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
              );
            }}
            onSelectAll={(checked) => {
              setSelectedMembers(checked ? members.map((m) => m.id) : []);
            }}
            getItemId={(item) => item.id}
            onRowClick={(id) => handleViewDetails(id)}
            showCheckboxes={true}
            actions={{
              onViewDetails: handleViewDetails,
            }}
            CardComponent={({ item }) => (
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-base mb-1">{`${item.firstName} ${item.lastName}`}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.email}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {item.createdAt}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status === "completed" ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </div>
                  <ViewDetailsButton
                    onClick={() => handleViewDetails(item.id)}
                  />
                </div>
              </div>
            )}
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
        uniqueLocations={Array.from(
          new Set(members.map((member) => member.location))
        )}
      />

      <DetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        title="Member Details"
        data={selectedMember}
        onStatusChange={handleStatusChange}
        statusLabels={{
          pending: "Pending",
          completed: "Contacted",
          buttonText: "Mark as Contacted",
        }}
      />
    </div>
  );
}
