import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MemberDetailsModal } from "@/components/members/MemberDetailsModal";
import { useIsMobile } from "@/hooks/use-mobile";

const sampleMembers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "+234 801 234 5678",
    email: "john.doe@gmail.com",
    country: "Nigeria",
    cityState: "Lagos, LA",
    preferredContact: "whatsapp",
    prayerRequest: "Please pray for my family's health and well-being.",
    dateSubmitted: new Date(2024, 2, 15).toLocaleDateString()
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+234 802 345 6789",
    email: "jane.smith@yahoo.com",
    country: "Nigeria",
    cityState: "Abuja, FC",
    preferredContact: "phone",
    prayerRequest: "I need prayers for my upcoming job interview.",
    dateSubmitted: new Date(2024, 2, 14).toLocaleDateString()
  }
];

export default function NewMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [members, setMembers] = useState(sampleMembers);
  const isMobile = useIsMobile();

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
      header: "Date Submitted", 
      accessor: (member: any) => (
        <div className="text-sm">{member.dateSubmitted}</div>
      )
    },
  ];

  const filteredMembers = members.filter(member => {
    const searchString = searchQuery.toLowerCase();
    return (
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchString) ||
      member.email.toLowerCase().includes(searchString) ||
      member.phone.toLowerCase().includes(searchString)
    );
  });

  const handleRowClick = (member: any) => {
    setSelectedMember(member);
    setDetailsModalOpen(true);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">New Members</h1>
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
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <MemberDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        member={selectedMember}
      />

      <div className="bg-white md:rounded-lg md:border">
        {isMobile && (
          <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b">
            <h2 className="font-medium text-sm text-gray-600">Member</h2>
            <h2 className="font-medium text-sm text-gray-600">Status</h2>
          </div>
        )}
        <DataTable
          data={filteredMembers}
          columns={columns}
          selectedItems={[]}
          onSelectItem={() => {}}
          onSelectAll={() => {}}
          getItemId={(item) => item.id}
          onRowClick={handleRowClick}
          showCheckboxes={false}
          CardComponent={({ item }) => (
            <div 
              className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleRowClick(item)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{`${item.firstName} ${item.lastName}`}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
                <span className="text-sm text-gray-500">{item.dateSubmitted}</span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}