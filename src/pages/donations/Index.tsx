import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { PaymentTableHeader } from "@/components/payments/PaymentTableHeader";
import { PaymentRow } from "@/components/payments/PaymentRow";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { BulkActions } from "@/components/shared/BulkActions";

const donations = [
  { 
    date: "14 Mar 2025", 
    customer: "John Doe", 
    amount: "₦5,000.00", 
    method: "Credit Card", 
    reference: "DON202503001",
    type: "One-time"
  },
  { 
    date: "28 Feb 2025", 
    customer: "Jane Smith", 
    amount: "₦10,000.00", 
    method: "Bank Transfer", 
    reference: "DON202502001",
    type: "Recurring"
  },
  { 
    date: "15 Dec 2024", 
    customer: "Alice Johnson", 
    amount: "₦2,500.00", 
    method: "Credit Card", 
    reference: "DON202412001",
    type: "One-time"
  }
];

export default function DonationHistory() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [filteredDonations, setFilteredDonations] = useState(donations);
  const [selectedDonations, setSelectedDonations] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = donations.filter((donation) =>
      Object.values(donation).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredDonations(filtered);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedDonations(checked ? filteredDonations.map(p => p.reference) : []);
  };

  const handleSelectDonation = (reference: string, checked: boolean) => {
    setSelectedDonations(prev => 
      checked 
        ? [...prev, reference]
        : prev.filter(ref => ref !== reference)
    );
  };

  const handleDownloadReceipt = (reference: string) => {
    toast({
      title: "Receipt Downloaded",
      description: `Receipt for donation ${reference} has been downloaded`,
    });
  };

  const handleBulkExportCSV = () => {
    const selectedDonationData = filteredDonations.filter(p => 
      selectedDonations.includes(p.reference)
    );
    
    const headers = ["Date", "Donor", "Amount", "Method", "Reference", "Type"];
    const csvData = selectedDonationData.map(donation => 
      [donation.date, donation.customer, donation.amount, donation.method, donation.reference, donation.type].join(",")
    );
    
    const csv = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `donation-history-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Selected donations have been exported as CSV",
    });
  };

  const handleApplyFilter = () => {
    if (!startDate || !endDate) return;
    
    const filtered = donations.filter(donation => {
      const donationDate = new Date(donation.date);
      return donationDate >= startDate && donationDate <= endDate;
    });
    setFilteredDonations(filtered);
  };

  const handleResetFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setFilteredDonations(donations);
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedDonations.length === 0) return;
    
    switch (bulkAction) {
      case "download":
        selectedDonations.forEach(reference => {
          handleDownloadReceipt(reference);
        });
        break;
      case "export":
        handleBulkExportCSV();
        break;
    }
    setBulkAction("");
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Donation History</h1>
      </div>

      <PaymentFilters
        searchQuery={searchQuery}
        setSearchQuery={handleSearch}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleResetFilter={handleResetFilter}
        handleApplyFilter={handleApplyFilter}
      />

      <div className="bg-white rounded-lg border">
        <Table>
          <PaymentTableHeader
            onSelectAll={handleSelectAll}
            isAllSelected={selectedDonations.length === filteredDonations.length}
          />
          <TableBody>
            {filteredDonations.map((donation) => (
              <PaymentRow
                key={donation.reference}
                payment={donation}
                isSelected={selectedDonations.includes(donation.reference)}
                onSelect={handleSelectDonation}
                onDownloadReceipt={handleDownloadReceipt}
              />
            ))}
          </TableBody>
        </Table>
        <BulkActions
          selectedCount={selectedDonations.length}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
          actions={[
            { value: "download", label: "Download Receipts" },
            { value: "export", label: "Export as CSV" }
          ]}
        />
      </div>
    </div>
  );
}