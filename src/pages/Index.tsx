import { useEffect, useState } from "react";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CustomerTransactions } from "@/components/customers/CustomerTransactions";
import { ShareModal } from "@/components/modals/ShareModal";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/types/customer";
import { Activity } from "@/types/activity";

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
          phone: "+1234567890",
          address: "123 Main St",
          totalSpent: "$0",
          date: "2024-03-15",
          invoices: [],
          estimates: [],
          receipts: [],
        },
        {
          id: "CUST-002",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1987654321",
          address: "456 Oak Ave",
          totalSpent: "$0",
          date: "2024-03-15",
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

  const recentActivities: Activity[] = [
    {
      type: "Publication",
      description: "New blog post published",
      amount: 0,
      date: "2024-03-15",
      status: "completed",
      reference: "BLG-001",
      member: "John Doe"
    },
    {
      type: "Event",
      description: "Sunday Service",
      amount: 0,
      date: "2024-03-14",
      status: "pending",
      reference: "EVT-001",
      member: "Church Admin"
    }
  ];

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