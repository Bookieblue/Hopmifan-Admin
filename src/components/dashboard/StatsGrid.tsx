import { Card } from "@/components/ui/card";
import { CircleDot, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Temporary mock data until connected to backend
const mockDonations = [
  { 
    date: "2024-03-14", 
    amount: 5057, 
    donor: "Member 1", 
    method: "Credit Card", 
    reference: "DON000001",
    type: "One-time"
  },
  { 
    date: "2024-03-13", 
    amount: 6470, 
    donor: "Member 2", 
    method: "Bank Transfer", 
    reference: "DON000002",
    type: "Recurring"
  },
];

export function StatsGrid() {
  const totalDonations = mockDonations.reduce((total, donation) => total + donation.amount, 0);
  const bookstoreSales = 30500; // This should come from bookstore data
  const prayerRequests = 24; // This should come from prayer requests data
  const membershipRequests = 2; // This should come from membership requests data

  return (
    <>
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-green-500 h-4 w-4" />
              <span className="text-lg font-medium">Total Donations</span>
            </div>
            <span className="text-3xl font-bold block">
              ₦{totalDonations.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-orange-500 h-4 w-4" />
              <span className="text-lg font-medium">Bookstore Sales</span>
            </div>
            <span className="text-3xl font-bold block">
              ₦{bookstoreSales.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-blue-500 h-4 w-4" />
              <span className="text-lg font-medium">Prayer Requests</span>
            </div>
            <span className="text-3xl font-bold block">{prayerRequests}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-purple-500 h-4 w-4" />
              <span className="text-lg font-medium">Members Request</span>
            </div>
            <span className="text-3xl font-bold block">{membershipRequests}</span>
          </div>
        </div>
      </Card>
    </>
  );
}