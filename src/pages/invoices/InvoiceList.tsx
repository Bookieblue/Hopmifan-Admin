import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";

const InvoiceList = () => {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState([
    { 
      id: "INV-2024-001",
      customer: "Acme Corporation",
      amount: "₦2,850.00",
      status: "pending",
      date: "15 Mar 2024"
    },
    { 
      id: "INV-2024-002",
      customer: "TechStart Solutions",
      amount: "₦1,590.00",
      status: "paid",
      date: "14 Mar 2024"
    }
  ]);

  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");

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

  const handleDuplicate = (invoiceId: string) => {
    const originalInvoice = invoices.find(inv => inv.id === invoiceId);
    if (!originalInvoice) return;

    const newInvoice = {
      ...originalInvoice,
      id: `${originalInvoice.id}-copy`,
      status: "pending",
      date: new Date().toLocaleDateString('en-US', { 
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
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

  const filteredInvoices = invoices.filter(invoice =>
    invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              placeholder="Search invoices..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Filter by Date
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter by Date Range</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From Date</label>
                  <DatePicker date={startDate} setDate={setStartDate} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To Date</label>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleResetFilter}>Reset Filter</Button>
                  <Button>Apply Filter</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        {selectedInvoices.length > 0 && (
          <div className="p-4 border-b bg-gray-50">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleBulkDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected ({selectedInvoices.length})
            </Button>
          </div>
        )}
        
        <InvoiceTable
          invoices={filteredInvoices}
          selectedInvoices={selectedInvoices}
          onSelectInvoice={handleSelectInvoice}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onShare={handleShare}
        />
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={handleCopyLink}
            >
              Copy Invoice Link
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleDownload('pdf')}
            >
              Download as PDF
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleDownload('jpg')}
            >
              Download as JPG
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleShareSocial('twitter')}
              >
                Twitter
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleShareSocial('linkedin')}
              >
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleShareSocial('facebook')}
              >
                Facebook
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceList;
