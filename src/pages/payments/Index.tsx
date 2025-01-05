import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody } from "@/components/ui/table";
import { Search, Download, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaymentTableHeader } from "@/components/payments/PaymentTableHeader";
import { PaymentRow } from "@/components/payments/PaymentRow";
import { PaymentBulkActions } from "@/components/payments/PaymentBulkActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";

const payments = [
  { 
    date: "14 Mar 2024", 
    customer: "Client 1", 
    amount: "₦5,057.00", 
    method: "Credit Card", 
    reference: "REF000001",
    type: "One-time"
  },
  { 
    date: "13 Mar 2024", 
    customer: "Client 2", 
    amount: "₦6,470.00", 
    method: "Bank Transfer", 
    reference: "REF000002",
    type: "Recurring"
  },
  { 
    date: "12 Mar 2024", 
    customer: "Client 3", 
    amount: "₦8,340.00", 
    method: "Credit Card", 
    reference: "REF000003",
    type: "One-time"
  },
  { 
    date: "11 Mar 2024", 
    customer: "Client 4", 
    amount: "₦3,355.00", 
    method: "Bank Transfer", 
    reference: "REF000004",
    type: "Recurring"
  },
  { 
    date: "10 Mar 2024", 
    customer: "Client 5", 
    amount: "₦7,104.00", 
    method: "Credit Card", 
    reference: "REF000005",
    type: "One-time"
  },
];

export default function PaymentHistory() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

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

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Payment History</h1>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4 flex-col sm:flex-row">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search by customer name, amount, or reference..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="gap-2 w-full sm:w-auto"
          onClick={() => setShowDateFilter(true)}
        >
          <Calendar className="w-4 h-4" />
          Filter by Date
        </Button>
      </div>

      <PaymentBulkActions
        selectedCount={selectedPayments.length}
        onBulkDownload={handleBulkDownload}
        onExportCSV={handleBulkExportCSV}
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
      </div>

      <Dialog open={showDateFilter} onOpenChange={setShowDateFilter}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter by Date Range</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label>Start Date</label>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
              />
            </div>
            <div className="grid gap-2">
              <label>End Date</label>
              <DatePicker
                date={endDate}
                setDate={setEndDate}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => {
              setStartDate(undefined);
              setEndDate(undefined);
              setShowDateFilter(false);
              setFilteredPayments(payments);
            }}>
              Reset
            </Button>
            <Button type="button" onClick={() => {
              if (!startDate || !endDate) {
                toast({
                  title: "Please select both dates",
                  variant: "destructive",
                });
                return;
              }
              const filtered = payments.filter(payment => {
                const paymentDate = new Date(payment.date);
                return paymentDate >= startDate && paymentDate <= endDate;
              });
              setFilteredPayments(filtered);
              setShowDateFilter(false);
            }}>
              Apply Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
