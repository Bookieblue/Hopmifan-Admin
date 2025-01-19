import { useState } from "react";
import { Table } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { PaymentTableHeader } from "@/components/payments/PaymentTableHeader";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { DataTable, TableColumn } from "@/components/shared/DataTable";

// Sample data - in a real app this would come from an API
const payments = [
  { 
    id: "1",
    date: "14 Mar 2025", 
    customer: "John Doe", 
    amount: "₦5,057.00", 
    method: "Credit Card", 
    reference: "REF202503001",
    type: "Book Purchase"
  },
  { 
    id: "2",
    date: "28 Feb 2025", 
    customer: "Jane Smith", 
    amount: "₦8,470.00", 
    method: "Bank Transfer", 
    reference: "REF202502001",
    type: "Donation"
  },
  { 
    id: "3",
    date: "15 Dec 2024", 
    customer: "Alice Johnson", 
    amount: "₦12,340.00", 
    method: "Credit Card", 
    reference: "REF202412001",
    type: "Book Purchase"
  },
  { 
    id: "4",
    date: "30 Sep 2024", 
    customer: "Bob Wilson", 
    amount: "₦7,355.00", 
    method: "Bank Transfer", 
    reference: "REF202409001",
    type: "Donation"
  }
];

type Payment = typeof payments[0];

export default function PaymentHistory() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [filteredPayments, setFilteredPayments] = useState(payments);

  const columns: TableColumn<Payment>[] = [
    { header: "Date", accessor: "date" },
    { header: "Customer", accessor: "customer" },
    { header: "Amount", accessor: "amount" },
    { header: "Method", accessor: "method" },
    { header: "Type", accessor: "type" },
    { header: "Reference", accessor: "reference" }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = payments.filter((payment) =>
      Object.values(payment).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredPayments(filtered);
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
      case "export":
        const selectedData = filteredPayments.filter(p => 
          selectedPayments.includes(p.id)
        );
        
        const headers = ["Date", "Customer", "Amount", "Method", "Type", "Reference"];
        const csvData = selectedData.map(payment => 
          [payment.date, payment.customer, payment.amount, payment.method, payment.type, payment.reference].join(",")
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
        <DataTable
          data={filteredPayments}
          columns={columns}
          selectedItems={selectedPayments}
          onSelectItem={(id, checked) => {
            setSelectedPayments(prev => 
              checked 
                ? [...prev, id]
                : prev.filter(item => item !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedPayments(checked ? filteredPayments.map(p => p.id) : []);
          }}
          getItemId={(item) => item.id}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
          bulkActions={[
            { value: "export", label: "Export as CSV" }
          ]}
        />
      </div>
    </div>
  );
}