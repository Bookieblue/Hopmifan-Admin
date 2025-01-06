import { Card } from "@/components/ui/card";
import { CircleDot, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Payment } from "@/utils/paymentCalculations";

// Temporary mock data until connected to backend
const mockPayments: Payment[] = [
  { 
    date: "2024-03-14", 
    amount: 5057, 
    customer: "Client 1", 
    method: "Credit Card", 
    reference: "REF000001",
    type: "One-time"
  },
  { 
    date: "2024-03-13", 
    amount: 6470, 
    customer: "Client 2", 
    method: "Bank Transfer", 
    reference: "REF000002",
    type: "Recurring"
  },
  // ... Add more mock payments for testing
];

export function StatsGrid() {
  const totalReceived = mockPayments.reduce((total, payment) => total + payment.amount, 0);
  const waitingToBePaid = 30500; // This should come from invoices data
  const overdueAmount = 4500; // This should come from invoices data
  const overdueCount = 2; // This should come from invoices data
  const waitingCount = 24; // This should come from invoices data

  return (
    <>
      <Link to="/payments" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <CircleDot className="text-green-500 h-4 w-4" />
                <span className="text-lg">Payments Received</span>
              </div>
              <span className="text-lg font-semibold">
                ₦{totalReceived.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors self-center" />
          </div>
        </div>
      </Link>

      <Link to="/invoices" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <CircleDot className="text-orange-500 h-4 w-4" />
                <span className="text-lg">{waitingCount} Waiting to be paid</span>
              </div>
              <span className="text-lg font-semibold">
                ₦{waitingToBePaid.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors self-center" />
          </div>
        </div>
      </Link>

      <Link to="/invoices?status=overdue" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <CircleDot className="text-red-500 h-4 w-4" />
                <span className="text-lg">{overdueCount} Overdue Invoices</span>
              </div>
              <span className="text-lg font-semibold">
                ₦{overdueAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors self-center" />
          </div>
        </div>
      </Link>
    </>
  );
}
