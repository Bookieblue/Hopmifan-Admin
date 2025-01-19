import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  FileText,
  Receipt,
  CreditCard,
  ChevronRight,
  BookOpen,
  Newspaper,
  Calendar,
  MessageSquare
} from "lucide-react";

const menuItems = [
  { icon: LayoutGrid, label: "Overview", path: "/" },
  {
    icon: FileText,
    label: "Publications",
    path: "/publications",
    submenu: [
      { label: "Articles", path: "/articles" },
      { label: "Bookstore", path: "/bookstore" }
    ]
  },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: MessageSquare, label: "Contact Messages", path: "/contacts" },
  { icon: CreditCard, label: "Donations", path: "/donations" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
];

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <nav className="flex-1 space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        const hasSubmenu = 'submenu' in item;

        return (
          <div key={item.path}>
            {hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isCollapsed ? "justify-center" : "justify-between",
                    "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
                    <Icon className="w-5 h-5 text-gray-500" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-transform",
                        openSubmenu === item.label ? "rotate-90" : ""
                      )}
                    />
                  )}
                </button>
                {!isCollapsed && openSubmenu === item.label && item.submenu && (
                  <div className="pl-4 space-y-1 mt-1">
                    {item.submenu.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;
                      const SubIcon = subItem.label === "Articles" ? Newspaper : BookOpen;
                      return (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            isSubActive
                              ? "bg-purple-50 text-purple-600"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          <SubIcon className={cn(
                            "w-5 h-5",
                            isSubActive ? "text-purple-600" : "text-gray-500"
                          )} />
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isCollapsed ? "justify-center" : "justify-start",
                  isActive
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-purple-600" : "text-gray-500"
                  )}
                />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}