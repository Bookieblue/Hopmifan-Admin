import { Link, useLocation, useNavigate } from "react-router-dom";
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
  MessageSquare,
  Users,
  Book,
  LogOut
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const menuItems = [
  { icon: LayoutGrid, label: "Overview", path: "/home" },
  {
    icon: FileText,
    label: "Publications",
    path: "/publications",
    submenu: [
      { label: "Articles", path: "/articles" },
      { label: "Bookstore", path: "/bookstore" }
    ]
  },
  { icon: CreditCard, label: "Donations", path: "/donations" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: MessageSquare, label: "Contact Messages", path: "/contacts" },
  { icon: BookOpen, label: "Prayer Requests", path: "/prayer-requests" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: Users, label: "New Members", path: "/new-members" },
  { icon: Book, label: "Sermons", path: "/sermons" },
  { icon: LogOut, label: "Logout", path: "/auth/signin" },
];

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

export function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { toast } = useToast();

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const handleLogout = (path: string) => {
    if (path === "/auth/signin") {
      toast({
        title: "Logged out successfully",
        description: "See you soon!",
      });
      navigate(path);
      return;
    }
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
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
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
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                            isSubActive
                              ? "bg-purple-50 text-[#695CAE] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#695CAE] before:rounded-r"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          <SubIcon className={cn(
                            "w-5 h-5",
                            isSubActive ? "text-[#695CAE]" : "text-gray-500"
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
                onClick={() => handleLogout(item.path)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                  isCollapsed ? "justify-center" : "justify-start",
                  isActive
                    ? "bg-purple-50 text-[#695CAE] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#695CAE] before:rounded-r"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-[#695CAE]" : "text-gray-500"
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