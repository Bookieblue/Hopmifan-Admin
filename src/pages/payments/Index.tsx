import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { DataTable, TableColumn } from "@/components/shared/DataTable";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [filteredPayments, setFilteredPayments] = useState(payments);

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

  const handleDownloadReceipt = (id: string) => {
    toast({
      title: "Receipt Downloaded",
      description: "Your receipt has been downloaded successfully",
    });
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
          actions={{
            onDownload: handleDownloadReceipt
          }}
          CardComponent={({ item }) => (
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.customer}</h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className="text-sm font-medium">{item.amount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
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