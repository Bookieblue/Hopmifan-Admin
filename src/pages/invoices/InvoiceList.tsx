import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const InvoiceList = () => {
  const { toast } = useToast();
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

  const handleBulkDelete = () => {
    setInvoices(invoices.filter(invoice => !selectedInvoices.includes(invoice.id)));
    toast({
      description: `${selectedInvoices.length} invoices have been deleted successfully.`
    });
    setSelectedInvoices([]);
    setBulkAction("");
  };

  const handleBulkDuplicate = () => {
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

  const handleDuplicate = (invoiceId: string) => {
    const originalInvoice = invoices.find(inv => inv.id === invoiceId);
    if (!originalInvoice) return;

    const newInvoice = {
      ...originalInvoice,
      id: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
      status: "pending",
      date: new Date().toISOString().split('T')[0]
    };

    setInvoices([newInvoice, ...invoices]);
    toast({
      description: `Invoice ${invoiceId} has been duplicated successfully.`
    });
  };

  const handleShare = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setShareDialogOpen(true);
  };

  const filteredInvoices = invoices.filter(invoice => {
    let matchesSearch = invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDateRange = true;
    if (startDate && endDate) {
      const invoiceDate = new Date(invoice.date);
      matchesDateRange = invoiceDate >= startDate && invoiceDate <= endDate;
    }
    
    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link to="/invoices/create">
          <Button size="default" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </Link>
      </div>

      <InvoiceFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleResetFilter={handleResetFilter}
      />

      <div className="bg-white rounded-lg border">
        <InvoiceTable
          invoices={filteredInvoices}
          selectedInvoices={selectedInvoices}
          onSelectInvoice={handleSelectInvoice}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onShare={handleShare}
        />

        {selectedInvoices.length > 0 && (
          <div className="p-4 border-t bg-gray-50 flex items-center gap-4">
            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select bulk action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delete">Delete Selected</SelectItem>
                <SelectItem value="duplicate">Duplicate Selected</SelectItem>
                <SelectItem value="export">Export as CSV</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleBulkAction}
              disabled={!bulkAction}
              className="ml-2"
            >
              Proceed
            </Button>
          </div>
        )}
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