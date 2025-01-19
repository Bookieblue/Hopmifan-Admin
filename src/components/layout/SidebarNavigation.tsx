import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  FileText,
  Receipt,
  CreditCard,
  Users,
  Settings,
  ChevronRight,
  BookOpen,
  Newspaper,
  Calendar
} from "lucide-react";

const menuItems = [
  { icon: LayoutGrid, label: "Overview", path: "/" },
  {
    icon: FileText,
    label: "Publications",
    path: "/publications",
    submenu: [
      { label: "Blog", path: "/blog" },
      { label: "Bookstore", path: "/bookstore" }
    ]
  },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: Users, label: "New Members", path: "/customers", submenu: [
    { label: "Members", path: "/customers" },
    { label: "Events", path: "/events" }
  ] },
];

const accountMenuItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
  const location = useLocation();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
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
                      const SubIcon = subItem.label === "Blog" ? Newspaper : BookOpen;
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

      <div className="relative">
        <button
          onClick={() => setIsAccountOpen(!isAccountOpen)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            isCollapsed ? "justify-center" : "justify-between",
            "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
            <Users className="w-5 h-5 text-gray-500" />
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

        {!isCollapsed && isAccountOpen && (
          <div className="pl-4 space-y-1 mt-1">
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
