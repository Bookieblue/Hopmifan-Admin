import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BulkActions } from "@/components/shared/BulkActions";

export default function Payments() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");

  // Sample data
  const payments = [
    {
      id: "1",
      date: "2024-01-01",
      customer: "John Doe",
      type: "Donation",
      amount: 100,
      method: "Credit Card",
    },
  ];

  const handleDownloadReceipt = (id: string) => {
    // Implement receipt download logic here
    toast({
      description: `Receipt for payment ${id} downloaded`,
    });
  };

  const filteredPayments = payments.filter((payment) => {
    return (
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleBulkAction = () => {
    if (!bulkAction || selectedPayments.length === 0) return;

    switch (bulkAction) {
      case "export":
        // Create CSV content
        const selectedPaymentData = filteredPayments.filter(p => 
          selectedPayments.includes(p.id)
        );
        
        const headers = ["Date", "Customer", "Type", "Amount", "Method"];
        const csvData = selectedPaymentData.map(payment => 
          [payment.date, payment.customer, payment.type, payment.amount, payment.method].join(",")
        );
        
        const csv = [headers.join(","), ...csvData].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `payments-${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast({
          description: `${selectedPayments.length} payments exported`,
        });
        break;
      case "download":
        selectedPayments.forEach(id => {
          handleDownloadReceipt(id);
        });
        toast({
          description: `${selectedPayments.length} receipts downloaded`,
        });
        break;
    }
    
    setSelectedPayments([]);
    setBulkAction("");
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search payments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable
          data={filteredPayments}
          columns={[
            { 
              header: "Date", 
              accessor: "date",
              className: "text-[14px]"
            },
            { 
              header: "Customer", 
              accessor: "customer",
              className: "text-[14px]"
            },
            { 
              header: "Type", 
              accessor: "type",
              className: "text-[14px]"
            },
            { 
              header: "Amount", 
              accessor: "amount",
              className: "text-[14px]"
            },
            { 
              header: "Method", 
              accessor: "method",
              className: "text-[14px]"
            }
          ]}
          selectedItems={selectedPayments}
          onSelectItem={(id, checked) => {
            setSelectedPayments(prev =>
              checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
            );
          }}
          onSelectAll={(checked) => {
            setSelectedPayments(checked ? filteredPayments.map(p => p.id) : []);
          }}
          getItemId={(item) => item.id}
          showCheckboxes={true}
          bulkActions={[
            { value: "export", label: "Export Selected" },
            { value: "download", label: "Download Receipts" }
          ]}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />

        {selectedPayments.length > 0 && (
          <BulkActions
            selectedCount={selectedPayments.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={[
              { value: "export", label: "Export Selected" },
              { value: "download", label: "Download Receipts" }
            ]}
          />
        )}
      </div>
    </div>
  );
};
