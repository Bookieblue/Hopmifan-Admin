import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
    // Generate receipt content
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

    // Create blob and download
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

  const handleExportCSV = () => {
    const selectedData = selectedPayments.length > 0 
      ? filteredPayments.filter(p => selectedPayments.includes(p.id))
      : filteredPayments;

    const csvContent = [
      ["Date", "Customer", "Type", "Amount", "Method"].join(","),
      ...selectedData.map(payment => 
        [payment.date, payment.customer, payment.type, payment.amount, payment.method].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'payments.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "CSV Exported",
      description: "Your payment data has been exported successfully",
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
            additionalActions: [{
              label: "Download Receipt",
              onClick: handleDownloadReceipt
            }]
          }}
          bulkActions={[
            { value: "export", label: "Export as CSV" }
          ]}
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
