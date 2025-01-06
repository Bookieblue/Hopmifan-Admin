import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { PaymentTableHeader } from "@/components/payments/PaymentTableHeader";
import { PaymentRow } from "@/components/payments/PaymentRow";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { BulkActions } from "@/components/shared/BulkActions";

const payments = [
  { 
    date: "14 Mar 2025", 
    customer: "Client A", 
    amount: "₦5,057.00", 
    method: "Credit Card", 
    reference: "REF202503001",
    type: "One-time"
  },
  { 
    date: "28 Feb 2025", 
    customer: "Client B", 
    amount: "₦8,470.00", 
    method: "Bank Transfer", 
    reference: "REF202502001",
    type: "Recurring"
  },
  { 
    date: "15 Dec 2024", 
    customer: "Client C", 
    amount: "₦12,340.00", 
    method: "Credit Card", 
    reference: "REF202412001",
    type: "One-time"
  },
  { 
    date: "30 Sep 2024", 
    customer: "Client D", 
    amount: "₦7,355.00", 
    method: "Bank Transfer", 
    reference: "REF202409001",
    type: "Recurring"
  },
  { 
    date: "15 Jun 2024", 
    customer: "Client E", 
    amount: "₦9,104.00", 
    method: "Credit Card", 
    reference: "REF202406001",
    type: "One-time"
  },
  { 
    date: "28 Mar 2024", 
    customer: "Client F", 
    amount: "₦6,250.00", 
    method: "Bank Transfer", 
    reference: "REF202403001",
    type: "Recurring"
  },
  { 
    date: "15 Dec 2023", 
    customer: "Client G", 
    amount: "₦11,780.00", 
    method: "Credit Card", 
    reference: "REF202312001",
    type: "One-time"
  },
  { 
    date: "30 Sep 2023", 
    customer: "Client H", 
    amount: "₦8,920.00", 
    method: "Bank Transfer", 
    reference: "REF202309001",
    type: "Recurring"
  },
  { 
    date: "15 Jun 2023", 
    customer: "Client I", 
    amount: "₦7,640.00", 
    method: "Credit Card", 
    reference: "REF202306001",
    type: "One-time"
  },
  { 
    date: "30 Mar 2023", 
    customer: "Client J", 
    amount: "₦9,890.00", 
    method: "Bank Transfer", 
    reference: "REF202303001",
    type: "Recurring"
  },
  { 
    date: "15 Jan 2023", 
    customer: "Client K", 
    amount: "₦6,430.00", 
    method: "Credit Card", 
    reference: "REF202301001",
    type: "One-time"
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

  const handleBulkDownload = () => {
    selectedPayments.forEach(reference => {
      handleDownloadReceipt(reference);
    });
    toast({
      title: "Bulk Download Started",
      description: `Downloading ${selectedPayments.length} receipts`,
    });
  };

  const handleDownloadReceipt = (reference: string) => {
    toast({
      title: "Receipt Downloaded",
      description: `Receipt for reference ${reference} has been downloaded`,
    });
  };

  const handleBulkExportCSV = () => {
    const selectedPaymentData = filteredPayments.filter(p => 
      selectedPayments.includes(p.reference)
    );
    
    const headers = ["Date", "Customer", "Amount", "Method", "Reference", "Type"];
    const csvData = selectedPaymentData.map(payment => 
      [payment.date, payment.customer, payment.amount, payment.method, payment.reference, payment.type].join(",")
    );
    
    const csv = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `payment-history-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Selected payments have been exported as CSV",
    });
  };

  const handleApplyFilter = () => {
    if (!startDate || !endDate) return;
    
    const filtered = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate >= startDate && paymentDate <= endDate;
    });
    setFilteredPayments(filtered);
  };

  const handleResetFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setFilteredPayments(payments);
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedPayments.length === 0) return;
    
    switch (bulkAction) {
      case "download":
        handleBulkDownload();
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
    </div>
  );
}
