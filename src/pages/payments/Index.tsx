import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";

export default function Payments() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [payments, setPayments] = useState<any[]>([]);
  const postsPerPage = 15;

  useEffect(() => {
    // Fetch payments data
    const fetchPayments = async () => {
      // Replace with your API call
      const mockPayments = [
        {
          date: "2024-03-15",
          customer: "John Doe",
          amount: "₦1,500.00",
          method: "Card",
          reference: "PAY-001",
          type: "Donation" as const
        },
        {
          date: "2024-03-14",
          customer: "Jane Smith",
          amount: "₦2,000.00",
          method: "Cash",
          reference: "PAY-002",
          type: "Book" as const
        }
      ];
      setPayments(mockPayments);
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(payment =>
    payment.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <Link to="/payments/create">
          <Button size="default" className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            New Payment
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        data={currentPayments}
        columns={[
          { header: "Date", accessor: "date" },
          { header: "Customer", accessor: "customer" },
          { header: "Amount", accessor: "amount" },
          { header: "Method", accessor: "method" },
          { header: "Reference", accessor: "reference" },
          { header: "Type", accessor: "type" },
        ]}
        getItemId={(item) => item.reference}
      />

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
