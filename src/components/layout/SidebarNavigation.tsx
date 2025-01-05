import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  FileText,
  Receipt,
  CreditCard,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { icon: LayoutGrid, label: "Overview", path: "/" },
  { icon: FileText, label: "Invoices", path: "/invoices", type: "invoices" },
  { icon: FileText, label: "Estimates", path: "/estimates", type: "estimates" },
  { icon: Receipt, label: "Receipts", path: "/receipts", type: "receipts" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
];

const accountMenuItems = [
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: CreditCard, label: "Subscription", path: "/subscription" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface EnabledDocuments {
  invoices: boolean;
  estimates: boolean;
  receipts: boolean;
}

interface SidebarNavigationProps {
  isCollapsed: boolean;
  enabledDocuments: EnabledDocuments;
  isAccountOpen: boolean;
  toggleAccount: () => void;
}

export function SidebarNavigation({ isCollapsed, enabledDocuments, isAccountOpen, toggleAccount }: SidebarNavigationProps) {
  const location = useLocation();

  // Filter menu items based on enabled documents
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.type) return true;
    return enabledDocuments[item.type as keyof EnabledDocuments];
  });

  return (
    <nav className="flex-1 space-y-1">
      {filteredMenuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
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
            {!isCollapsed && item.label}
          </Link>
        );
      })}

      {/* Account Menu with Dropdown */}
      <div className="relative">
        <button
          onClick={toggleAccount}
          className={cn(
            "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            isAccountOpen
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <div className="flex items-center gap-3">
            <Users className={cn("w-5 h-5", isAccountOpen ? "text-blue-600" : "text-gray-500")} />
            {!isCollapsed && <span>Account</span>}
          </div>
          {!isCollapsed && (
            <ChevronRight
              className={cn(
                "w-4 h-4 transition-transform",
                isAccountOpen ? "rotate-90" : ""
              )}
            />
          )}
        </button>

        {/* Account Submenu */}
        {!isCollapsed && (
          <div
            className={cn(
              "pl-4 space-y-1 overflow-hidden transition-all duration-200",
              isAccountOpen ? "max-h-[500px] mt-1" : "max-h-0"
            )}
          >
            {accountMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
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
          </div>
        )}
      </div>
    </nav>
  );
}