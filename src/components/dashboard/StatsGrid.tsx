import { Card } from "@/components/ui/card";
import { CircleDot, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function StatsGrid() {
  return (
    <Card className="bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/payments" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <CircleDot className="text-green-500 h-4 w-4" />
                  <span className="text-lg">Payments Received</span>
                </div>
                <span className="text-lg font-semibold">₦4500.00</span>
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
                  <span className="text-lg">24 Waiting to be paid</span>
                </div>
                <span className="text-lg font-semibold">₦30500.00</span>
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
                  <span className="text-lg">2 Overdue Invoices</span>
                </div>
                <span className="text-lg font-semibold">₦4500.00</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors self-center" />
            </div>
          </div>
        </Link>
      </div>
    </Card>
  );
}