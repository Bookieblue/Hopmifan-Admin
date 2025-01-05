import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useDocuments } from "@/contexts/DocumentContext";

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  type?: string;
}

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
  const location = useLocation();
  const { enabledDocuments } = useDocuments();

  const menuItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Overview", path: "/" },
    { icon: FileText, label: "Invoices", path: "/invoices", type: "invoices" },
    { icon: FileText, label: "Estimates", path: "/estimates", type: "estimates" },
    { icon: Receipt, label: "Receipts", path: "/receipts", type: "receipts" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (!item.type) return true;
    return enabledDocuments[item.type as keyof typeof enabledDocuments];
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
    </nav>
  );
}