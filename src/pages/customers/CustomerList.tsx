import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { useIsMobile } from "@/hooks/use-mobile";

const initialMembers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 234 567 890",
    email: "john@example.com",
    country: "Nigeria",
    cityState: "Lagos",
    preferredContact: "Email",
    prayerRequest: "Family health and prosperity",
    dateSubmitted: "2024-03-15"
  },
  // Add more sample data as needed
];

type Member = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  cityState: string;
  preferredContact: string;
  prayerRequest: string;
  dateSubmitted: string;
};

export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState(initialMembers);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const columns = [
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Phone", accessor: "phone" },
    { header: "Email", accessor: "email" },
    { header: "Country", accessor: "country" },
    { header: "City & State", accessor: "cityState" },
    { header: "Preferred Contact", accessor: "preferredContact" },
    { 
      header: "Prayer Request", 
      accessor: (member: Member) => (
        <div className="max-w-[200px] truncate" title={member.prayerRequest}>
          {member.prayerRequest}
        </div>
      )
    },
    { header: "Date Submitted", accessor: "dateSubmitted" },
  ];

  const filteredMembers = members.filter(member => 
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMember = (id: string, checked: boolean) => {
    setSelectedMembers(prev =>
      checked ? [...prev, id] : prev.filter(memberId => memberId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedMembers(checked ? filteredMembers.map(m => m.id) : []);
  };

  const handleViewDetail = (id: string) => {
    // Navigate to detail view
    console.log("Viewing member details:", id);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">New Members</h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable
          data={filteredMembers}
          columns={columns}
          selectedItems={selectedMembers}
          onSelectItem={handleSelectMember}
          onSelectAll={handleSelectAll}
          getItemId={(item) => item.id}
          actions={{
            additionalActions: [
              {
                label: "View Details",
                onClick: handleViewDetail
              }
            ]
          }}
          onRowClick={handleViewDetail}
        />
      </div>
    </div>
  );
}