import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable, TableColumn } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterModal } from "@/components/donations/FilterModal";
import { DonationDetailsModal } from "@/components/donations/DonationDetailsModal";
import { BulkActions } from "@/components/shared/BulkActions";

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

export default function DonationHistory() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedDonations, setSelectedDonations] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<typeof donations[0] | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const columns: TableColumn<typeof donations[0]>[] = [
    { 
      header: "Member", 
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
      accessor: (donation) => (
        <div className="space-y-1">
          <div>{donation.paymentMethod}</div>
          <div className="text-sm text-gray-500">{donation.date}</div>
        </div>
      ),
      className: "text-gray-500 font-normal"
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (id: string) => {
    const donation = donations.find(d => d.id === id);
    if (donation) {
      setSelectedDonation(donation);
      setDetailsModalOpen(true);
    }
  };

  const handleBulkAction = () => {
    if (!selectedDonations.length) return;

    switch (bulkAction) {
      case "exportCSV": {
        const selectedDonationData = donations.filter(d => selectedDonations.includes(d.id));
        const headers = ["Donor Name", "Amount", "Date", "Giving Type", "State", "Payment Method"];
        const csvData = selectedDonationData.map(donation => 
          [donation.donorName, donation.amount, donation.date, donation.givingType, donation.state, donation.paymentMethod].join(",")
        );
        
        const csv = [headers.join(","), ...csvData].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `donations-${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          description: `${selectedDonations.length} donations exported as CSV`,
        });
        break;
      }
      case "exportPDF": {
        toast({
          description: `${selectedDonations.length} donations exported as PDF`,
        });
        break;
      }
    }
    setSelectedDonations([]);
    setBulkAction("");
  };

  const filteredDonations = donations.filter((donation) =>
    Object.values(donation).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const bulkActions = [
    { value: "exportCSV", label: "Export as CSV" },
    { value: "exportPDF", label: "Export as PDF" }
  ];

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
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <FilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueTypes={Array.from(new Set(donations.map(d => d.givingType)))}
        uniqueStates={Array.from(new Set(donations.map(d => d.state)))}
      />

      <div className="bg-white md:rounded-lg md:border">
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
          showCheckboxes={true}
          bulkActions={bulkActions}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
          actions={{
            onViewDetails: handleViewDetails
          }}
          CardComponent={({ item }) => (
            <div 
              className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.donorName}</h3>
                  <p className="text-sm text-gray-500">{item.givingType}</p>
                </div>
                <span className="font-medium">{item.amount}</span>
              </div>
            </div>
          )}
        />

        {selectedDonations.length > 0 && (
          <BulkActions
            selectedCount={selectedDonations.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={bulkActions}
          />
        )}
      </div>

      <DonationDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        donation={selectedDonation}
      />
    </div>
  );
}