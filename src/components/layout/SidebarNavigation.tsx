import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  FileText,
  Receipt,
  CreditCard,
  Users,
  ChevronRight,
  BookOpen,
  Newspaper,
  Calendar,
  Mail,
  DollarSign,
  Speaker
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
  { 
    icon: Users, 
    label: "Members", 
    path: "/customers"
  },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Speaker, label: "Sermons", path: "/sermons" },
  { icon: Mail, label: "Contact", path: "/contacts" },
  { icon: DollarSign, label: "Donations", path: "/donations" },
  { icon: Mail, label: "Prayer Requests", path: "/prayers" },
];

interface SidebarNavigationProps {
  isCollapsed?: boolean;
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
                    "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-500" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 ml-auto transition-transform",
                      openSubmenu === item.label ? "rotate-90" : ""
                    )}
                  />
                </button>
                {openSubmenu === item.label && item.submenu && (
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
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}