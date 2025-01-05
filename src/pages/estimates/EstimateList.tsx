import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { InvoiceListHeader } from "@/components/invoices/InvoiceListHeader";
import { toast } from "sonner";

export default function EstimateList() {
  const [selectedEstimates, setSelectedEstimates] = useState<string[]>([]);
  const [estimates] = useState([
    {
      id: "EST-001",
      customer: "Acme Corp",
      amount: "$1,200.00",
      status: "pending",
      date: "2024-03-15",
      type: "one-time" as const
    },
    {
      id: "EST-002",
      customer: "TechStart Inc",
      amount: "$2,500.00",
      status: "accepted",
      date: "2024-03-14",
      type: "one-time" as const
    }
  ]);

  const handleDelete = (id: string) => {
    toast.success("Estimate deleted successfully");
  };

  const handleDuplicate = (id: string) => {
    toast.success("Estimate duplicated successfully");
  };

  const handleShare = (id: string) => {
    toast.success("Sharing estimate...");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Estimates</h1>
        <Link to="/estimates/create">
          <Button>Create Estimate</Button>
        </Link>
      </div>

      <InvoiceTable
        invoices={estimates}
        selectedInvoices={selectedEstimates}
        onSelectInvoice={(id, checked) => {
          setSelectedEstimates(prev =>
            checked ? [...prev, id] : prev.filter(item => item !== id)
          );
        }}
        onSelectAll={(checked) => {
          setSelectedEstimates(checked ? estimates.map(est => est.id) : []);
        }}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onShare={handleShare}
      />
    </div>
  );
}