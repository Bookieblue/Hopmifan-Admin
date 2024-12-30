import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, CalendarDays, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { ShareModal } from "@/components/modals/ShareModal";

const InvoiceList = () => {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState([
    { 
      id: "INV-2345",
      customer: "Acme Corporation",
      amount: "₦2,850.00",
      status: "pending",
      date: "2024-03-15",
      type: "One-time"
    },
    { 
      id: "INV-2346",
      customer: "TechStart Solutions",
      amount: "₦1,590.00",
      status: "paid",
      date: "2024-03-14",
      type: "Recurring"
    }
  ]);

  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedInvoiceForShare, setSelectedInvoiceForShare] = useState<string | null>(null);

  const handleBulkDelete = () => {
    setInvoices(invoices.filter(invoice => !selectedInvoices.includes(invoice.id)));
    setSelectedInvoices([]);
    toast({
      title: "Success",
      description: "Selected invoices have been deleted",
    });
  };

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
    toast({
      title: "Success",
      description: "Invoice has been deleted",
    });
  };

  const handleDuplicate = (id: string) => {
    const invoiceToDuplicate = invoices.find(invoice => invoice.id === id);
    if (invoiceToDuplicate) {
      const duplicatedInvoice = {
        ...invoiceToDuplicate,
        id: `INV-${Math.random().toString(36).substr(2, 9)}`,
      };
      setInvoices([...invoices, duplicatedInvoice]);
      toast({
        title: "Success",
        description: "Invoice has been duplicated",
      });
    }
  };

  const handleShare = (id: string) => {
    setSelectedInvoiceForShare(id);
    setShareDialogOpen(true);
  };

  const handleCopyLink = () => {
    // Implementation for copying link
    toast({
      title: "Success",
      description: "Link copied to clipboard",
    });
  };

  const handleDownload = (format: string) => {
    // Implementation for downloading
    toast({
      title: "Success",
      description: `Invoice downloaded as ${format}`,
    });
  };

  const handleShareSocial = (platform: string) => {
    // Implementation for social sharing
    toast({
      title: "Success",
      description: `Shared on ${platform}`,
    });
  };

  const handleDateFilter = () => {
    if (startDate && endDate) {
      const filteredInvoices = invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= startDate && invoiceDate <= endDate;
      });
      setInvoices(filteredInvoices);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarDays className="w-4 h-4" />
                Filter by date
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter by date range</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label>Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </div>
                <div className="space-y-2">
                  <label>End Date</label>
                  <DatePicker
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </div>
                <Button onClick={handleDateFilter} className="w-full">
                  Apply Filter
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4">
          {selectedInvoices.length > 0 && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleBulkDelete}
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </Button>
          )}
          <Link to="/invoices/create">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Invoice
            </Button>
          </Link>
        </div>
      </div>

      <InvoiceTable
        invoices={invoices}
        selectedInvoices={selectedInvoices}
        onSelectInvoice={(id, checked) => {
          if (checked) {
            setSelectedInvoices([...selectedInvoices, id]);
          } else {
            setSelectedInvoices(selectedInvoices.filter(i => i !== id));
          }
        }}
        onSelectAll={(checked) => {
          if (checked) {
            setSelectedInvoices(invoices.map(invoice => invoice.id));
          } else {
            setSelectedInvoices([]);
          }
        }}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onShare={handleShare}
      />

      <ShareModal
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onCopyLink={handleCopyLink}
        onDownload={handleDownload}
        onShareSocial={handleShareSocial}
      />
    </div>
  );
};

export default InvoiceList;