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
      <Link to="/donations" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <CircleDot className="text-green-500 h-4 w-4" />
                <span className="text-lg">Total Donations</span>
              </div>
              <span className="text-[34px] font-semibold leading-none">
                ₦{totalDonations.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors self-center" />
          </div>
        </div>
      </Link>

      <Link to="/bookstore" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <CircleDot className="text-orange-500 h-4 w-4" />
                <span className="text-lg">Bookstore Sales</span>
              </div>
              <span className="text-[34px] font-semibold leading-none">
                ₦{bookstoreSales.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors self-center" />
          </div>
        </div>
      </Link>

      <Link to="/prayer-requests" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <CircleDot className="text-blue-500 h-4 w-4" />
                <span className="text-lg">{prayerRequests} Prayer Requests</span>
              </div>
              <span className="text-[34px] font-semibold leading-none">
                {prayerRequests}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors self-center" />
          </div>
        </div>
      </Link>

      <Link to="/membership" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <CircleDot className="text-purple-500 h-4 w-4" />
                <span className="text-lg">{membershipRequests} Membership Requests</span>
              </div>
              <span className="text-[34px] font-semibold leading-none">
                {membershipRequests}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors self-center" />
          </div>
        </div>
      </Link>
    </>
  );
}