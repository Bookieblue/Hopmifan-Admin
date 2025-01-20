import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { DataTable, TableColumn } from "@/components/shared/DataTable";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilterModal } from "@/components/donations/FilterModal";

// Sample data - in a real app this would come from an API
const payments = [
  { 
    id: "1",
    date: "14 Mar 2025", 
    customer: "John Doe", 
    amount: "₦5,057.00", 
    method: "Credit Card", 
    type: "Book Purchase"
  },
  { 
    id: "2",
    date: "28 Feb 2025", 
    customer: "Jane Smith", 
    amount: "₦8,470.00", 
    method: "Bank Transfer", 
    type: "Donation"
  },
  { 
    id: "3",
    date: "15 Dec 2024", 
    customer: "Alice Johnson", 
    amount: "₦12,340.00", 
    method: "Credit Card", 
    type: "Book Purchase"
  },
  { 
    id: "4",
    date: "30 Sep 2024", 
    customer: "Bob Wilson", 
    amount: "₦7,355.00", 
    method: "Bank Transfer", 
    type: "Donation"
  }
];

type Payment = typeof payments[0];

export default function PaymentHistory() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const columns: TableColumn<Payment>[] = [
    { header: "Date", accessor: "date" },
    { header: "Customer", accessor: "customer" },
    { header: "Type", accessor: "type" },
    { header: "Amount", accessor: "amount" },
    { header: "Method", accessor: "method" }
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
    let filtered = [...payments];

    if (typeFilter !== "all") {
      filtered = filtered.filter(payment => payment.type === typeFilter);
    }

    if (methodFilter !== "all") {
      filtered = filtered.filter(payment => payment.method === methodFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter(payment => payment.date === dateFilter);
    }

    setFilteredPayments(filtered);
    setFilterModalOpen(false);
  };

  const handleResetFilter = () => {
    setTypeFilter("all");
    setMethodFilter("all");
    setDateFilter("");
    setFilteredPayments(payments);
  };

  const handleDownloadReceipt = (id: string) => {
    const payment = payments.find(p => p.id === id);
    if (!payment) return;

    const receiptContent = `
Receipt
-------
Date: ${payment.date}
Customer: ${payment.customer}
Amount: ${payment.amount}
Type: ${payment.type}
Method: ${payment.method}
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Receipt Downloaded",
      description: "Your receipt has been downloaded successfully",
    });
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="page-heading">Payment History</h1>
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
        onOpenFilterModal={() => setFilterModalOpen(true)}
      />

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        stateFilter={methodFilter}
        setStateFilter={setMethodFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        uniqueTypes={Array.from(new Set(payments.map(p => p.type)))}
        uniqueStates={Array.from(new Set(payments.map(p => p.method)))}
      />

      {isMobile && (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50 mb-4">
          <span className="text-sm font-medium text-gray-600">Member</span>
          <span className="text-sm font-medium text-gray-600">Status</span>
        </div>
      )}

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
          actions={{
            additionalActions: [{
              label: "Download Receipt",
              onClick: handleDownloadReceipt
            }]
          }}
          bulkActions={[
            { value: "export", label: "Export as CSV" }
          ]}
          CardComponent={({ item }) => (
            <div className="py-4 px-4 border-b last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.customer}</h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className="text-sm font-medium">{item.amount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <span>{item.type}</span>
                <span>•</span>
                <span>{item.method}</span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}