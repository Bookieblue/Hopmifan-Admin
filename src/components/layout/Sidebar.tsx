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
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Invoices", path: "/invoices" },
  { icon: Calculator, label: "Estimates", path: "/estimates" },
  { icon: Receipt, label: "Receipts", path: "/receipts" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: Bell, label: "Reminders", path: "/reminders" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-background border-r border-border p-4 fixed left-0 top-0">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-mint-500">InvoiceFlow</h1>
        </div>
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                  "hover:bg-mint-50 hover:text-mint-600",
                  location.pathname === item.path
                    ? "bg-mint-50 text-mint-600"
                    : "text-gray-600"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}