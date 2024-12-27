import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Download, MoreHorizontal, Search } from "lucide-react";

// Mock data for the payment history
const payments = [
  { date: "14 Mar 2024", customer: "Client 1", amount: "₦5,057.00", method: "Credit Card", reference: "REF000001" },
  { date: "13 Mar 2024", customer: "Client 2", amount: "₦6,470.00", method: "Bank Transfer", reference: "REF000002" },
  { date: "12 Mar 2024", customer: "Client 3", amount: "₦8,340.00", method: "Credit Card", reference: "REF000003" },
  { date: "11 Mar 2024", customer: "Client 4", amount: "₦3,355.00", method: "Bank Transfer", reference: "REF000004" },
  { date: "10 Mar 2024", customer: "Client 5", amount: "₦7,104.00", method: "Credit Card", reference: "REF000005" },
];

export default function PaymentHistory() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Payment History</h1>
        <Button variant="outline" className="gap-2 whitespace-nowrap">
          <Download className="w-4 h-4" />
          Export as CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10 w-full"
            placeholder="Search by customer name, amount, or reference..."
          />
        </div>
        <Button variant="outline" className="gap-2 whitespace-nowrap">
          <Calendar className="w-4 h-4" />
          Filter by Date
        </Button>
      </div>

      <div className="w-full overflow-auto rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
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
                <TableCell>{payment.reference}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
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