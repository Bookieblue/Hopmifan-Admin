import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable, TableColumn } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterModal } from "@/components/donations/FilterModal";

// Sample data
const donations = [
  {
    id: "1",
    donorName: "Oluwaseun Adebayo",
    firstName: "Oluwaseun",
    lastName: "Adebayo",
    amount: "₦50,000",
    date: "15 Mar 2024",
    givingType: "Tithe",
    phone: "+234 803 123 4567",
    email: "oluwaseun@example.com",
    country: "Nigeria",
    state: "Lagos",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "2",
    donorName: "Chioma Okonkwo",
    firstName: "Chioma",
    lastName: "Okonkwo",
    amount: "₦25,000",
    date: "14 Mar 2024",
    givingType: "Offering",
    phone: "+234 805 987 6543",
    email: "chioma@example.com",
    country: "Nigeria",
    state: "Abuja",
    paymentMethod: "Card Payment"
  },
  {
    id: "3",
    donorName: "Emmanuel Nwachukwu",
    firstName: "Emmanuel",
    lastName: "Nwachukwu",
    amount: "₦100,000",
    date: "13 Mar 2024",
    givingType: "Project Support",
    phone: "+234 802 345 6789",
    email: "emmanuel@example.com",
    country: "Nigeria",
    state: "Rivers",
    paymentMethod: "Bank Transfer"
  }
];

type Donation = typeof donations[0];

export default function DonationHistory() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedDonations, setSelectedDonations] = useState<string[]>([]);
  const [filteredDonations, setFilteredDonations] = useState(donations);

  const columns: TableColumn<Donation>[] = [
    { 
      header: "Donor Name", 
      accessor: "donorName" 
    },
    { 
      header: "Amount", 
      accessor: "amount" 
    },
    { 
      header: "Giving Type", 
      accessor: "givingType" 
    },
    { 
      header: "State", 
      accessor: "state" 
    },
    { 
      header: "Payment Info", 
      accessor: (donation: Donation) => (
        <div className="space-y-1">
          <div>{donation.paymentMethod}</div>
          <div className="text-sm text-gray-500">{donation.date}</div>
        </div>
      )
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = donations.filter((donation) =>
      Object.values(donation).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredDonations(filtered);
  };

  const uniqueTypes = Array.from(new Set(donations.map(d => d.givingType)));
  const uniqueStates = Array.from(new Set(donations.map(d => d.state)));

  const handleViewDetails = (id: string) => {
    const donation = donations.find(d => d.id === id);
    if (donation) {
      toast({
        title: "Donation Details",
        description: `Viewing details for ${donation.donorName}'s donation`
      });
    }
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Donation History</h1>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search donations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
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

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueTypes={uniqueTypes}
        uniqueStates={uniqueStates}
      />

      <div className="bg-white rounded-lg border">
        <DataTable
          data={filteredDonations}
          columns={columns}
          selectedItems={selectedDonations}
          onSelectItem={(id, checked) => {
            setSelectedDonations(prev => 
              checked 
                ? [...prev, id]
                : prev.filter(item => item !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedDonations(checked ? filteredDonations.map(d => d.id) : []);
          }}
          getItemId={(item) => item.id}
          showCheckboxes={false}
          CardComponent={({ item }) => (
            <div className="p-4 border-b last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{item.donorName}</h3>
                  <p className="text-sm text-gray-500">{item.givingType}</p>
                </div>
                <span className="font-medium">{item.amount}</span>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>{item.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{item.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>State:</span>
                  <span>{item.state}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}