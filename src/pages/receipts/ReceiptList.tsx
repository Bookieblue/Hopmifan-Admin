import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody } from "@/components/ui/table";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReceiptRow } from "@/components/receipts/ReceiptRow";
import { ReceiptTableHeader } from "@/components/receipts/ReceiptTableHeader";

// Mock data for the receipts list with added status and type
const receipts = [
  { 
    id: "RCP-001",
    client: "Global Inc",
    date: "2024-03-15",
    amount: "₦999.00",
    status: "paid",
    type: "recurring"
  },
  { 
    id: "RCP-002",
    client: "TechStart Inc",
    date: "2024-03-14",
    amount: "₦1,500.00",
    status: "pending",
    type: "one-time"
  },
];

const statusOptions = ["all", "paid", "pending", "overdue"];
const typeOptions = ["all", "recurring", "one-time"];

export default function ReceiptList() {
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState<Date>();
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const { toast } = useToast();

  const filteredReceipts = receipts.filter((receipt) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      receipt.id.toLowerCase().includes(searchLower) ||
      receipt.client.toLowerCase().includes(searchLower) ||
      receipt.date.includes(searchQuery) ||
      receipt.amount.toLowerCase().includes(searchLower);

    const matchesStatus = filterStatus === "all" || receipt.status === filterStatus;
    const matchesType = filterType === "all" || receipt.type === filterType;
    const matchesDate = !filterDate || receipt.date === filterDate.toISOString().split('T')[0];

    return matchesSearch && matchesStatus && matchesType && matchesDate;
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

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Receipts</h1>
        <Link to="/receipts/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Receipt
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              className="pl-10"
              placeholder="Search receipts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Receipts</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <DatePicker date={filterDate} setDate={setFilterDate} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <ReceiptTableHeader 
            onSelectAll={handleSelectAll}
            isAllSelected={selectedReceipts.length === filteredReceipts.length && filteredReceipts.length > 0}
          />
          <TableBody>
            {filteredReceipts.map((receipt) => (
              <ReceiptRow
                key={receipt.id}
                receipt={receipt}
                isSelected={selectedReceipts.includes(receipt.id)}
                onSelect={handleSelectReceipt}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}