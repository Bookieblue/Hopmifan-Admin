import { useState } from "react";
import { MoreVertical, Plus, Eye, Trash2, CheckSquare, XSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import { useToast } from "@/hooks/use-toast";
import { FilterModal } from "@/components/members/FilterModal";
import { BulkActions } from "@/components/shared/BulkActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: "pending" | "approved";
}

const sampleMembers: Member[] = [
  {
    id: "MEM-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    location: "New York",
    joinDate: "2024-03-15",
    status: "pending"
  },
  {
    id: "MEM-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    location: "Los Angeles",
    joinDate: "2024-03-14",
    status: "approved"
  }
];

export default function NewMembers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [bulkAction, setBulkAction] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string>("");

  const [members, setMembers] = useState<Member[]>(() => {
    const stored = localStorage.getItem('members');
    if (!stored) {
      localStorage.setItem('members', JSON.stringify(sampleMembers));
      return sampleMembers;
    }
    return JSON.parse(stored);
  });

  const handleDelete = (id: string) => {
    setMemberToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const updatedMembers = members.filter(member => member.id !== memberToDelete);
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    toast({
      description: "Member deleted successfully",
    });
    setDeleteDialogOpen(false);
    setMemberToDelete("");
    setSelectedMembers(selectedMembers.filter(itemId => itemId !== memberToDelete));
  };

  const handleStatusChange = (id: string, newStatus: "pending" | "approved") => {
    const updatedMembers = members.map(member => {
      if (member.id === id) {
        return { ...member, status: newStatus };
      }
      return member;
    });
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    toast({
      description: `Member ${newStatus === 'approved' ? 'approved' : 'marked as pending'} successfully`,
    });
  };

  const handleViewDetails = (id: string) => {
    // Implement view details functionality
    console.log("View details for member:", id);
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedMembers.length === 0) return;

    const updatedMembers = [...members];
    
    switch (bulkAction) {
      case "approve":
      case "pending":
        selectedMembers.forEach(id => {
          const memberIndex = updatedMembers.findIndex(m => m.id === id);
          if (memberIndex !== -1) {
            updatedMembers[memberIndex] = {
              ...updatedMembers[memberIndex],
              status: bulkAction === "approve" ? "approved" : "pending"
            };
          }
        });
        break;
      case "delete":
        const remainingMembers = updatedMembers.filter(
          member => !selectedMembers.includes(member.id)
        );
        setMembers(remainingMembers);
        localStorage.setItem('members', JSON.stringify(remainingMembers));
        toast({
          description: `${selectedMembers.length} members deleted successfully`,
        });
        setSelectedMembers([]);
        setBulkAction("");
        return;
    }
    
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    setSelectedMembers([]);
    setBulkAction("");
    
    toast({
      description: `${selectedMembers.length} members ${bulkAction === "approve" ? "approved" : "marked as pending"} successfully`,
    });
  };

  const uniqueLocations = Array.from(new Set(members.map(member => member.location)));

  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === "all" || member.location === locationFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    const matchesDate = !dateFilter || member.joinDate.includes(dateFilter);
    return matchesSearch && matchesLocation && matchesStatus && matchesDate;
  });

  const columns = [
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
      header: "Join Date",
      accessor: "joinDate",
      className: "text-[14px]"
    },
    {
      header: "Status",
      accessor: (member: Member) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          member.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {member.status}
        </span>
      ),
      className: "text-[14px]"
    },
    {
      header: "Actions",
      accessor: (member: Member) => (
        <div className="flex items-center justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => handleViewDetails(member.id)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(member.id, member.status === 'approved' ? 'pending' : 'approved')}>
                {member.status === 'approved' ? (
                  <>
                    <XSquare className="h-4 w-4 mr-2" />
                    Mark as Pending
                  </>
                ) : (
                  <>
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Approve
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(member.id)} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      className: "text-[14px]"
    }
  ];

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Members</h1>
        <Button className="bg-[#695CAE] hover:bg-[#695CAE]/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <Button
          variant="outline"
          onClick={() => setFilterModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable
          data={filteredMembers}
          columns={columns}
          selectedItems={selectedMembers}
          onSelectItem={(id, checked) => {
            setSelectedMembers(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedMembers(checked ? filteredMembers.map(m => m.id) : []);
          }}
          getItemId={(item) => item.id}
          showCheckboxes={true}
          bulkActions={[
            { value: "approve", label: "Approve Selected" },
            { value: "pending", label: "Mark as Pending" },
            { value: "delete", label: "Delete Selected" }
          ]}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />

        {selectedMembers.length > 0 && (
          <BulkActions
            selectedCount={selectedMembers.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "approve", label: "Approve Selected" },
              { value: "pending", label: "Mark as Pending" },
              { value: "delete", label: "Delete Selected" }
            ]}
          />
        )}
      </div>

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueLocations={uniqueLocations}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the member
              and remove all of their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}