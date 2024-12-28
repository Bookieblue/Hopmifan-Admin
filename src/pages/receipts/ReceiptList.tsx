import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, Download, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

// Mock data for the receipts list
const receipts = [
  { 
    id: "RCP-001",
    client: "Global Inc",
    date: "2024-03-15",
    amount: "₦999.00"
  },
  { 
    id: "RCP-002",
    client: "TechStart Inc",
    date: "2024-03-14",
    amount: "₦1,500.00"
  },
];

export default function ReceiptList() {
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredReceipts = receipts.filter((receipt) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      receipt.id.toLowerCase().includes(searchLower) ||
      receipt.client.toLowerCase().includes(searchLower) ||
      receipt.date.includes(searchQuery) ||
      receipt.amount.toLowerCase().includes(searchLower)
    );
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReceipts(filteredReceipts.map(receipt => receipt.id));
    } else {
      setSelectedReceipts([]);
    }
  };

  const handleSelectReceipt = (receiptId: string, checked: boolean) => {
    if (checked) {
      setSelectedReceipts([...selectedReceipts, receiptId]);
    } else {
      setSelectedReceipts(selectedReceipts.filter(id => id !== receiptId));
    }
  };

  const handleBulkDelete = () => {
    // In a real app, this would make an API call to delete the selected receipts
    toast({
      title: "Receipts deleted",
      description: `${selectedReceipts.length} receipt(s) have been deleted.`,
    });
    setSelectedReceipts([]);
  };

  const handleDownload = (receiptId: string) => {
    // In a real app, this would trigger the download of the receipt
    toast({
      title: "Download started",
      description: `Receipt ${receiptId} is being downloaded.`,
    });
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Receipts</h1>
        <div className="flex gap-2">
          {selectedReceipts.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </Button>
          )}
          <Link to="/receipts/create">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Receipt
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search receipts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedReceipts.length === filteredReceipts.length && filteredReceipts.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all receipts"
                />
              </TableHead>
              <TableHead>Receipt #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReceipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedReceipts.includes(receipt.id)}
                    onCheckedChange={(checked) => handleSelectReceipt(receipt.id, checked as boolean)}
                    aria-label={`Select receipt ${receipt.id}`}
                  />
                </TableCell>
                <TableCell>{receipt.id}</TableCell>
                <TableCell>{receipt.client}</TableCell>
                <TableCell>{receipt.date}</TableCell>
                <TableCell>{receipt.amount}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link to={`/receipts/${receipt.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to={`/receipts/${receipt.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleDownload(receipt.id)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}