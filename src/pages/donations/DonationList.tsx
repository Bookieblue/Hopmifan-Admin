import { useState } from "react";
import { DataTable, TableColumn } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Donation } from "@/types/donation";
import { Eye } from "lucide-react";

const mockDonations: Donation[] = [
  {
    id: "1",
    donorName: "John Doe",
    amount: 1000,
    date: "2024-03-15",
    givingType: "Tithe",
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567890",
    email: "john@example.com",
    country: "Nigeria",
    state: "Lagos",
    paymentMethod: "Paystack",
    status: "completed",
  },
  // Add more mock data as needed
];

export default function DonationList() {
  const { toast } = useToast();
  const [selectedDonations, setSelectedDonations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDonations, setFilteredDonations] = useState(mockDonations);

  const columns: TableColumn<Donation>[] = [
    { header: "Donor Name", accessor: "donorName" },
    { 
      header: "Amount", 
      accessor: (donation) => `₦${donation.amount.toLocaleString()}`,
      className: "font-medium"
    },
    { header: "Date", accessor: "date" },
    { header: "Giving Type", accessor: "givingType" },
    { 
      header: "Status", 
      accessor: (donation) => (
        <Badge variant={donation.status === "completed" ? "default" : "destructive"}>
          {donation.status}
        </Badge>
      )
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockDonations.filter((donation) =>
      Object.values(donation).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredDonations(filtered);
  };

  const handleViewDetail = (id: string) => {
    toast({
      title: "View Donation Details",
      description: `Viewing details for donation ${id}`,
    });
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Donations</h1>
        <Button>Export Report</Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search donations..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <DataTable
          data={filteredDonations}
          columns={columns}
          selectedItems={selectedDonations}
          onSelectItem={(id, checked) => {
            setSelectedDonations(prev =>
              checked ? [...prev, id] : prev.filter(item => item !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedDonations(checked ? filteredDonations.map(d => d.id) : []);
          }}
          getItemId={(item) => item.id}
          onRowClick={handleViewDetail}
          actions={{
            additionalActions: [
              {
                label: "View Details",
                onClick: (id) => handleViewDetail(id),
              },
            ],
          }}
        />
      </div>
    </div>
  );
}