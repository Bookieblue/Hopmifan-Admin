import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Download, MoreHorizontal, Search, Receipt } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock data for the payment history with added payment type
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

  const handleExportCSV = () => {
    // Convert payments data to CSV format
    const headers = ["Date", "Customer", "Amount", "Method", "Reference", "Type"];
    const csvData = payments.map(payment => 
      [payment.date, payment.customer, payment.amount, payment.method, payment.reference, payment.type].join(",")
    );
    
    const csv = [headers.join(","), ...csvData].join("\n");
    
    // Create and download the CSV file
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
      description: "Payment history has been downloaded as CSV",
    });
  };

  const handleDownloadReceipt = (reference: string) => {
    // Mock receipt download - in real implementation, this would fetch the receipt
    toast({
      title: "Receipt Downloaded",
      description: `Receipt for reference ${reference} has been downloaded`,
    });
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Payment History</h1>
        <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
          <Download className="w-4 h-4" />
          Export as CSV
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search by customer name, amount, or reference..."
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          Filter by Date
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead className="w-[48px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.reference}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownloadReceipt(payment.reference)}>
                        <Receipt className="w-4 h-4 mr-2" />
                        Download Receipt
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}