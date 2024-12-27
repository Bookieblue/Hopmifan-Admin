import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FileText,
  LayoutDashboard,
  Receipt,
  CreditCard,
  Users,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Invoices", path: "/invoices" },
  { icon: FileText, label: "Estimates", path: "/estimates" },
  { icon: Receipt, label: "Receipts", path: "/receipts" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: BarChart, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-full w-64 bg-white border-r border-gray-100 p-6 flex flex-col">
      <div className="mb-8">
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">C</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Cordlo</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path === "/" ? "/" : `${item.path}/`) || location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-blue-600" : "text-gray-500"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <Link
          to="/auth/signin"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 text-gray-500" />
          Sign out
        </Link>
      </div>
    </div>
  );
}