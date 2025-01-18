import { useEffect, useState } from "react";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CustomerTransactions } from "@/components/customers/CustomerTransactions";
import { ShareModal } from "@/components/modals/ShareModal";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/types/customer";

const Index = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");

  useEffect(() => {
    // Fetch customers data
    const fetchCustomers = async () => {
      // Replace with your API call
      const mockCustomers: Customer[] = [
        {
          id: "CUST-001",
          name: "John Doe",
          email: "john@example.com",
          invoices: [],
          estimates: [],
          receipts: [],
        },
        {
          id: "CUST-002",
          name: "Jane Smith",
          email: "jane@example.com",
          invoices: [],
          estimates: [],
          receipts: [],
        },
      ];
      setCustomers(mockCustomers);
    };

    fetchCustomers();
  }, []);

  const handleShare = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setShareDialogOpen(true);
  };

  const recentActivities = [
    {
      type: "Publication" as const,
      description: "New blog post published",
      amount: 0,
      date: "2024-03-15",
      status: "completed" as const,
      reference: "BLG-001",
      member: "John Doe"
    },
    {
      type: "Event" as const,
      description: "Sunday Service",
      amount: 0,
      date: "2024-03-14",
      status: "pending" as const,
      reference: "EVT-001",
      member: "Church Admin"
    }
  ] as const;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <RecentActivity activities={recentActivities} />
      {selectedCustomer && (
        <CustomerTransactions
          customer={selectedCustomer}
        />
      )}
      <ShareModal 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        invoiceId={selectedCustomerId}
      />
    </div>
  );
};

export default Index;
