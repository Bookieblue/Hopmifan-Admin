import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { PaymentTableHeader } from "@/components/payments/PaymentTableHeader";
import { PaymentRow } from "@/components/payments/PaymentRow";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { BulkActions } from "@/components/shared/BulkActions";
import { FilterModal } from "@/components/donations/FilterModal";

const payments = [
  { 
    date: "14 Mar 2025", 
    customer: "John Doe", 
    amount: "₦5,000.00", 
    method: "Credit Card", 
    reference: "PAY202503001"
  },
  { 
    date: "28 Feb 2025", 
    customer: "Jane Smith", 
    amount: "₦10,000.00", 
    method: "Bank Transfer", 
    reference: "PAY202502001"
  },
  { 
    date: "15 Dec 2024", 
    customer: "Alice Johnson", 
    amount: "₦2,500.00", 
    method: "Credit Card", 
    reference: "PAY202412001"
  }
];

export default function PaymentHistory() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleDownloadReceipt = (id: string) => {
    toast({
      description: `Receipt for payment ${id} downloaded`,
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = payments.filter((payment) =>
      Object.values(payment).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredPayments(filtered);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedPayments(checked ? filteredPayments.map(p => p.reference) : []);
  };

  const handleSelectPayment = (reference: string, checked: boolean) => {
    setSelectedPayments(prev => 
      checked 
        ? [...prev, reference]
        : prev.filter(ref => ref !== reference)
    );
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedPayments.length === 0) return;
    
    switch (bulkAction) {
      case "download":
        selectedPayments.forEach(reference => {
          handleDownloadReceipt(reference);
        });
        break;
      case "export":
        // Export logic here
        break;
    }
    setBulkAction("");
  };

  const handleApplyFilter = () => {
    if (!startDate || !endDate) return;
    
    const filtered = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate >= startDate && paymentDate <= endDate;
    });
    setFilteredPayments(filtered);
    setIsFilterModalOpen(false);
  };

  const handleResetFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setFilteredPayments(payments);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Payment History</h1>
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
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
      />

      <div className="bg-white rounded-lg border">
        <Table>
          <PaymentTableHeader
            onSelectAll={handleSelectAll}
            isAllSelected={selectedPayments.length === filteredPayments.length}
          />
          <TableBody>
            {filteredPayments.map((payment) => (
              <PaymentRow
                key={payment.reference}
                payment={payment}
                isSelected={selectedPayments.includes(payment.reference)}
                onSelect={handleSelectPayment}
                onDownloadReceipt={handleDownloadReceipt}
              />
            ))}
          </TableBody>
        </Table>
        <BulkActions
          selectedCount={selectedPayments.length}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
          actions={[
            { value: "download", label: "Download Receipts" },
            { value: "export", label: "Export as CSV" }
          ]}
        />
      </div>

      <FilterModal 
        open={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      />
    </div>
  );
}
