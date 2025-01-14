import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, Mail, Phone, MapPin, Calendar, Wallet,
  ArrowLeft
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CustomerActions } from "@/components/customers/CustomerActions";
import { CustomerTransactions } from "@/components/customers/CustomerTransactions";
import { Customer } from "@/types/customer";

// Mock data for the customer details
const customerData = {
  "1": {
    id: "1",
    name: "Acme Corp",
    email: "billing@acme.com",
    phone: "+1 234 567 890",
    address: "123 Business Ave, Lagos, Nigeria",
    totalSpent: "₦12,500.00",
    date: "15 Mar 2024",
    profilePicture: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    invoices: [
      { id: "INV-001", date: "15 Mar 2024", amount: "₦5,000.00", status: "paid" },
      { id: "INV-002", date: "10 Mar 2024", amount: "₦7,500.00", status: "pending" }
    ],
    estimates: [
      { id: "EST-001", date: "05 Mar 2024", amount: "₦3,000.00", status: "accepted" }
    ],
    receipts: [
      { id: "RCP-001", date: "15 Mar 2024", amount: "₦5,000.00", status: "completed" }
    ]
  },
  "2": {
    id: "2",
    name: "TechStart Solutions",
    email: "finance@techstart.com",
    phone: "+1 987 654 321",
    address: "456 Innovation Way, Abuja, Nigeria",
    totalSpent: "₦8,750.00",
    date: "14 Mar 2024",
    profilePicture: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    invoices: [
      { id: "INV-003", date: "14 Mar 2024", amount: "₦8,750.00", status: "paid" }
    ],
    estimates: [],
    receipts: [
      { id: "RCP-002", date: "14 Mar 2024", amount: "₦8,750.00", status: "completed" }
    ]
  }
};

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentCustomer, setCurrentCustomer] = useState<Customer | undefined>(
    customerData[id as keyof typeof customerData]
  );

  if (!currentCustomer) {
    return (
      <div className="p-2.5 md:p-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/customers")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <p>Customer not found</p>
      </div>
    );
  }

  const handleCustomerUpdate = (updatedCustomer: Customer) => {
    setCurrentCustomer(updatedCustomer);
  };

  return (
    <div className="p-2.5 md:p-6 max-w-[1400px] mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/customers")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-gray-900">{currentCustomer.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Profile Card */}
        <Card className="bg-white border shadow-sm h-fit">
          <CardContent className="p-6">
            <div className="flex flex-col items-start text-left">
              <Avatar className="w-24 h-24 border-2 border-gray-100 mb-4">
                <AvatarImage src={currentCustomer.profilePicture} alt={currentCustomer.name} />
                <AvatarFallback className="bg-gray-50 text-gray-600 text-xl">
                  {currentCustomer.name[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{currentCustomer.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{currentCustomer.email}</p>
              
              <CustomerActions 
                customer={currentCustomer}
                onCustomerUpdate={handleCustomerUpdate}
              />
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p className="text-gray-900">{currentCustomer.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900 break-all">{currentCustomer.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{currentCustomer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-900">{currentCustomer.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wallet className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Spent</p>
                  <p className="text-gray-900 font-semibold">{currentCustomer.totalSpent}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer Since</p>
                  <p className="text-gray-900">{currentCustomer.date}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Section */}
        <CustomerTransactions customer={currentCustomer} />
      </div>
    </div>
  );
}
