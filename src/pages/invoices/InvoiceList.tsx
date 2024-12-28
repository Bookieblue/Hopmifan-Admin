import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const InvoiceList = () => {
  const invoices = [
    { 
      id: "045",
      customer: "Sophie Shonia",
      amount: "₦4700.00",
      status: "unpaid",
      type: "one-time",
      date: "Sep, 11, 2024"
    },
    { 
      id: "045",
      customer: "Johnson LTD",
      amount: "₦4700.00",
      status: "paid",
      type: "one-time",
      date: "Sep, 11, 2024"
    },
    { 
      id: "045",
      customer: "Atlantis Limited",
      amount: "₦4700.00",
      status: "paid",
      type: "one-time",
      date: "Sep, 11, 2024"
    },
    { 
      id: "045",
      customer: "Mary Helen",
      amount: "₦4700.00",
      status: "overdue",
      type: "one-time",
      date: "Sep, 11, 2024"
    }
  ];

  const statusTabs = ["All", "Paid", "Pending", "Overdue"];

  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="p-4 max-w-[800px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Invoices</h1>
        <Link to="/invoices/create">
          <Button size="icon" className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search" 
            className="pl-10 bg-white rounded-full border-gray-200"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex space-x-6 border-b">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-2 px-1",
                activeTab === tab 
                  ? "border-b-2 border-blue-600 text-blue-600" 
                  : "text-gray-500"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div 
              key={`${invoice.customer}-${invoice.id}`}
              className="p-4 bg-white rounded-lg space-y-2"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{invoice.customer}</h3>
                <span className="text-lg font-semibold">{invoice.amount}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <div className="space-x-2">
                  <span>{invoice.type}</span>
                  <span>•</span>
                  <span>{invoice.date}</span>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm",
                  invoice.status === "paid" && "bg-green-100 text-green-800",
                  invoice.status === "unpaid" && "bg-orange-100 text-orange-800",
                  invoice.status === "overdue" && "bg-red-100 text-red-800"
                )}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;