import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FileText,
  Calculator,
  Receipt,
  CreditCard,
  Bell,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Invoices", path: "/invoices" },
  { icon: Calculator, label: "Estimates", path: "/estimates" },
  { icon: Receipt, label: "Receipts", path: "/receipts" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: Bell, label: "Reminders", path: "/reminders" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 p-4 fixed left-0 top-0 font-inter">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/43d04b44-fc73-46eb-8543-89f240871e1d.png" 
              alt="InvoiceFlow Logo" 
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-gray-500")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <Link
            to="/auth/signin"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span>Sign out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}