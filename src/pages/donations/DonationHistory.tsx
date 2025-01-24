import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, TableColumn } from "@/components/shared/DataTable";
import { FilterModal } from "@/components/donations/FilterModal";
import { ViewDetailsModal } from "@/components/donations/ViewDetailsModal";

interface Donation {
  id: string;
  donor: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
  paymentMethod: string;
  reference: string;
}

const sampleDonations: Donation[] = [
  {
    id: "DON-001",
    donor: "John Smith",
    amount: 100.00,
    date: "2024-03-15",
    status: "completed",
    paymentMethod: "Credit Card",
    reference: "REF123456"
  },
  {
    id: "DON-002",
    donor: "Jane Doe",
    amount: 50.00,
    date: "2024-03-14",
    status: "pending",
    paymentMethod: "Bank Transfer",
    reference: "REF789012"
  },
];

export default function DonationHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const handleViewDetails = (id: string) => {
    const donation = donations.find(d => d.id === id);
    if (donation) {
      setSelectedDonation(donation);
      setDetailsModalOpen(true);
    }
  };

  const [donations] = useState<Donation[]>(sampleDonations);

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter;
    const matchesDate = !dateFilter || donation.date.includes(dateFilter);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const columns: TableColumn<Donation>[] = [
    {
      header: "Donor",
      accessor: "donor",
      className: "text-[14px]"
    },
    {
      header: "Amount",
      accessor: (donation: Donation) => (
        <span className="text-[14px]">
          ${donation.amount.toFixed(2)}
        </span>
      ),
      className: "text-[14px]"
    },
    {
      header: "Date",
      accessor: "date",
      className: "text-[14px]"
    },
    {
      header: "Status",
      accessor: (donation: Donation) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          donation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {donation.status}
        </span>
      ),
      className: "text-[14px]"
    },
    {
      header: "Actions",
      accessor: (donation: Donation) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails(donation.id);
          }}
          className="text-[#9b87f5] text-sm hover:underline"
        >
          See details
        </button>
      ),
      className: "text-gray-500 font-normal"
    }
  ];

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Donation History</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search donations..."
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
          data={filteredDonations}
          columns={columns}
          selectedItems={[]}
          onSelectItem={() => {}}
          onSelectAll={() => {}}
          getItemId={(item) => item.id}
          showCheckboxes={false}
        />
      </div>

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      {selectedDonation && (
        <ViewDetailsModal
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          donation={selectedDonation}
        />
      )}
    </div>
  );
}
