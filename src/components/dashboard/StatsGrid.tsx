import { Card } from "@/components/ui/card";
import { CircleDot, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function StatsGrid() {
  return (
    <Card className="bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/payments" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <CircleDot className="text-green-500 h-4 w-4" />
            <span className="text-lg">Payments Received</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold">₦4500.00</span>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </Link>

        <Link to="/invoices" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <CircleDot className="text-orange-500 h-4 w-4" />
            <span className="text-lg">24 Waiting to be paid</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold">₦30500.00</span>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </Link>

        <Link to="/invoices?status=overdue" className="flex flex-col items-start space-y-2 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <CircleDot className="text-red-500 h-4 w-4" />
            <span className="text-lg">2 Overdue Invoices</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold">₦4500.00</span>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </Link>
      </div>
    </Card>
  );
}