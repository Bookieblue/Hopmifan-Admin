import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable, TableColumn } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterModal } from "@/components/donations/FilterModal";
import { DonationDetailsModal } from "@/components/donations/DonationDetailsModal";
import { BulkActions } from "@/components/shared/BulkActions";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/components/utils/formatDate";



export default function DonationHistory() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedDonations, setSelectedDonations] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<typeof donations[0] | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);


  const backendURL = import.meta.env.VITE_PUBLIC_API_BASE_URL || "";


  // Fetch members using TanStack Query

  const fetchMembers = async () => {
    const response = await fetch(`${backendURL}/api/donations`);
  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }
  const result = await response.json();

  // Ensure we return an array and map to update status dynamically
  return Array.isArray(result.data?.events)
  ? result.data.events.map(donate => ({
      ...donate,
    }))
  : [];

};

  

  const { data: donations = [], isLoading, isError } = useQuery({
    queryKey: ["donations"],
    queryFn: fetchMembers,
  });
  

  const columns: TableColumn<typeof donations[0]>[] = [
    { 
      header: "Member", 
      accessor: (donation: any) => (
        <div>
          <div className="font-medium">{`${donation.firstName} ${donation.lastName}`}</div>
          <div className="text-sm text-gray-500">{donation.email}</div>
        </div>
      )
    },
    { 
      header: "Amount", 
      accessor: (donation) => `₦${donation.amount}`
    },
    { 
      header: "Giving Type", 
      accessor: "donationType" 
    },
    { 
      header: "Phone Number", 
      accessor: "phoneNumber" 
    },
    { 
      header: "State", 
      accessor: "cityAndState" 
    },
    { 
      header: "Payment Info", 
      accessor: (donation) => (
        <div className="space-y-1">
          <div>{donation.trxfReference}</div>
          <div className="text-xs text-gray-500"> {formatDate(donation.createdAt)}</div>
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
    <div className="mobile-spacing">
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
      {isLoading ? (
    <div className="flex justify-center items-center p-6">
      <span className="animate-spin border-4 border-gray-300 border-t-gray-600 rounded-full w-6 h-6"></span>
      <span className="ml-3 text-gray-600">Loading Donations...</span>
    </div>
  ) : isError ? (
    <div className="text-center text-red-500 p-6">Failed to load donations. Please try again.</div>
  ) : (
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
                  <h3 className="font-medium">{item.firstName}</h3>
                  <p className="text-sm text-gray-500">{item.donationType}</p>
                </div>
                <span className="font-medium">₦{item.amount}</span>
              </div>
            </div>
          )}
        />

  )}

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
