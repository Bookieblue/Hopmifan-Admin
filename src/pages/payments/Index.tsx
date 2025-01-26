import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { PaymentTableHeader } from "@/components/payments/PaymentTableHeader";
import { PaymentRow } from "@/components/payments/PaymentRow";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { BulkActions } from "@/components/shared/BulkActions";
import { FilterModal } from "@/components/donations/FilterModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const payments = [
  { 
    date: "14 Mar 2025", 
    customer: "John Doe", 
    amount: "₦5,000.00", 
    method: "Credit Card", 
    reference: "PAY202503001",
    type: "Payment"
  },
  { 
    date: "28 Feb 2025", 
    customer: "Jane Smith", 
    amount: "₦10,000.00", 
    method: "Bank Transfer", 
    reference: "PAY202502001",
    type: "Payment"
  },
  { 
    date: "15 Dec 2024", 
    customer: "Alice Johnson", 
    amount: "₦2,500.00", 
    method: "Credit Card", 
    reference: "PAY202412001",
    type: "Payment"
  }
];

export default function PaymentHistory() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

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

  const handleViewDetails = (reference: string) => {
    const payment = payments.find(p => p.reference === reference);
    if (payment) {
      setSelectedPayment(payment);
      setDetailsModalOpen(true);
    }
  };

  const PaymentCard = ({ payment }: { payment: any }) => (
    <div className="p-4 border-b last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{payment.customer}</h3>
          <p className="text-sm text-gray-500">{payment.date}</p>
        </div>
        <span className="font-medium">{payment.amount}</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm text-gray-500">
          <p>{payment.method}</p>
          <p>Ref: {payment.reference}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            toast({
              title: "Receipt Downloaded",
              description: `Receipt for payment ${payment.reference} has been downloaded`,
            });
          }}
          className="h-8 w-8"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Payment History</h1>
      </div>

      <PaymentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleResetFilter={() => {
          setStartDate(undefined);
          setEndDate(undefined);
          setFilteredPayments(payments);
          setIsFilterModalOpen(false);
        }}
        handleApplyFilter={() => {
          if (!startDate || !endDate) return;
          const filtered = payments.filter(payment => {
            const paymentDate = new Date(payment.date);
            return paymentDate >= startDate && paymentDate <= endDate;
          });
          setFilteredPayments(filtered);
          setIsFilterModalOpen(false);
        }}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
      />

      <div className="bg-white rounded-lg border">
        {isMobile ? (
          <div className="divide-y">
            {filteredPayments.map((payment) => (
              <PaymentCard key={payment.reference} payment={payment} />
            ))}
          </div>
        ) : (
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
                  onDownloadReceipt={() => {
                    toast({
                      title: "Receipt Downloaded",
                      description: `Receipt for payment ${payment.reference} has been downloaded`,
                    });
                  }}
                />
              ))}
            </TableBody>
          </Table>
        )}
        {selectedPayments.length > 0 && (
          <BulkActions
            selectedCount={selectedPayments.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={() => {
              if (!bulkAction || selectedPayments.length === 0) return;
              
              switch (bulkAction) {
                case "download":
                  selectedPayments.forEach(reference => {
                    toast({
                      title: "Receipt Downloaded",
                      description: `Receipt for payment ${reference} has been downloaded`,
                    });
                  });
                  break;
                case "export":
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
                  break;
              }
              setBulkAction("");
            }}
            actions={[
              { value: "download", label: "Download Receipts" },
              { value: "export", label: "Export as CSV" }
            ]}
          />
        )}
      </div>

      <FilterModal 
        open={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onApply={() => {
          if (!startDate || !endDate) return;
          const filtered = payments.filter(payment => {
            const paymentDate = new Date(payment.date);
            return paymentDate >= startDate && paymentDate <= endDate;
          });
          setFilteredPayments(filtered);
          setIsFilterModalOpen(false);
        }}
        onReset={() => {
          setStartDate(undefined);
          setEndDate(undefined);
          setFilteredPayments(payments);
          setIsFilterModalOpen(false);
        }}
      />
    </div>
  );
}