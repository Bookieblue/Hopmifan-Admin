import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { InvoiceListHeader } from "@/components/invoices/InvoiceListHeader";
import { useIsMobile } from "@/hooks/use-mobile";

const InvoiceList = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [invoices, setInvoices] = useState([
    { 
      id: "INV-2345",
      customer: "Acme Corporation",
      amount: "₦2,850.00",
      status: "pending",
      date: "2024-03-15",
      type: "one-time" as const
    },
    { 
      id: "INV-2346",
      customer: "TechStart Solutions",
      amount: "₦1,590.00",
      status: "paid",
      date: "2024-03-14",
      type: "recurring" as const
    }
  ]);

  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");
  const [bulkAction, setBulkAction] = useState<string>("");

  const handleSelectInvoice = (invoiceId: string, checked: boolean) => {
    if (checked) {
      setSelectedInvoices([...selectedInvoices, invoiceId]);
    } else {
      setSelectedInvoices(selectedInvoices.filter(id => id !== invoiceId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(invoices.map(invoice => invoice.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleResetFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleDelete = (invoiceId: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
    toast({
      description: `Invoice ${invoiceId} has been deleted successfully.`
    });
  };

  const handleShare = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setShareDialogOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedInvoices.length === 0) return;
    setInvoices(invoices.filter(invoice => !selectedInvoices.includes(invoice.id)));
    toast({
      description: `${selectedInvoices.length} invoices have been deleted successfully.`
    });
    setSelectedInvoices([]);
    setBulkAction("");
  };

  const handleBulkDuplicate = () => {
    if (selectedInvoices.length === 0) return;
    const newInvoices = [...invoices];
    selectedInvoices.forEach(id => {
      const originalInvoice = invoices.find(inv => inv.id === id);
      if (originalInvoice) {
        const newInvoice = {
          ...originalInvoice,
          id: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
          status: "pending",
          date: new Date().toISOString().split('T')[0]
        };
        newInvoices.push(newInvoice);
      }
    });
    setInvoices(newInvoices);
    toast({
      description: `${selectedInvoices.length} invoices have been duplicated successfully.`
    });
    setSelectedInvoices([]);
    setBulkAction("");
  };

  const handleBulkExport = () => {
    if (selectedInvoices.length === 0) return;
    const selectedInvoicesData = invoices.filter(invoice => 
      selectedInvoices.includes(invoice.id)
    );
    
    const csvContent = [
      ["Invoice ID", "Customer", "Amount", "Status", "Date", "Type"],
      ...selectedInvoicesData.map(invoice => [
        invoice.id,
        invoice.customer,
        invoice.amount,
        invoice.status,
        invoice.date,
        invoice.type
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      description: `${selectedInvoices.length} invoices have been exported successfully.`
    });
    setSelectedInvoices([]);
    setBulkAction("");
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedInvoices.length === 0) return;
    
    switch (bulkAction) {
      case "delete":
        handleBulkDelete();
        break;
      case "duplicate":
        handleBulkDuplicate();
        break;
      case "export":
        handleBulkExport();
        break;
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-2.5 md:px-6">
      <InvoiceListHeader />
      <InvoiceFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleResetFilter={handleResetFilter}
      />

      <div className="bg-white md:rounded-lg md:border">
        <InvoiceTable
          invoices={invoices}
          selectedInvoices={selectedInvoices}
          onSelectInvoice={handleSelectInvoice}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
          onDuplicate={handleBulkDuplicate}
          onShare={handleShare}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
        />
      </div>

      <ShareModal 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        invoiceId={selectedInvoiceId}
      />
    </div>
  );
};

export default InvoiceList;