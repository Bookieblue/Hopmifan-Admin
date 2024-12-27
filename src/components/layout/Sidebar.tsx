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
    <div className="h-screen w-64 bg-background border-r border-border p-4 fixed left-0 top-0">
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
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
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