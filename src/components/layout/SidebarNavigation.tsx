import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  LogOut,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDashboardData } from "@/hooks/useDashboardData";

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
  {
    icon: Calendar,
    label: "Events",
    path: "/events",
    submenu: [
      { label: "Event List", path: "/events" },
      { label: "Registrations", path: "/events/registered" }
    ]
  },
  {
    icon: MessageSquare,
    label: "Messages",
    path: "/messages",
    submenu: [
      { label: "Contact Messages", path: "/contacts" },
      { label: "Prayer Requests", path: "/prayer-requests" }
    ]
  },
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
  const { stats } = useDashboardData();
  const [paymentsViewed, setPaymentsViewed] = useState(false);

  useEffect(() => {
    // Mark payments as viewed when visiting the payments page
    if (location.pathname === '/payments') {
      setPaymentsViewed(true);
      localStorage.setItem('payments_viewed', 'true');
    }
  }, [location.pathname]);

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

  // Get notification count based on menu item
  const getNotificationCount = (label: string) => {
    if (!stats.data) return 0;
    switch (label) {
      case "Contact Messages":
        return stats.data.contactMessages;
      case "Prayer Requests":
        return stats.data.prayerRequests;
      case "Messages":
        return stats.data.contactMessages + stats.data.prayerRequests;
      case "New Members":
        return stats.data.membershipRequests;
      case "Payments":
        return paymentsViewed ? 0 : stats.data.newPayments;
      default:
        return 0;
    }
  };

  return (
    <nav className="flex-1">
      <div className="space-y-0.5">
        {menuItems.slice(0, -1).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const hasSubmenu = 'submenu' in item;
          const notificationCount = getNotificationCount(item.label);

          return (
            <div key={item.path}>
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                      isCollapsed ? "justify-center" : "justify-between",
                      "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
                      <Icon className="w-5 h-5 text-gray-500" />
                      {!isCollapsed && <span>{item.label}</span>}
                      {!isCollapsed && notificationCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
                          {notificationCount}
                        </span>
                      )}
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
                    <div className="pl-4 space-y-0.5 mt-0.5">
                      {item.submenu.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        const subNotificationCount = getNotificationCount(subItem.label);
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={cn(
                              "flex items-center justify-between gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                              isSubActive
                                ? "bg-purple-50 text-[#695CAE] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#695CAE] before:rounded-r"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <MessageSquare className={cn(
                                "w-5 h-5",
                                isSubActive ? "text-[#695CAE]" : "text-gray-500"
                              )} />
                              <span>{subItem.label}</span>
                            </div>
                            {subNotificationCount > 0 && (
                              <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
                                {subNotificationCount}
                              </span>
                            )}
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
                    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
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
                  {!isCollapsed && (
                    <>
                      <span>{item.label}</span>
                      {notificationCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-600 rounded-full ml-auto">
                          {notificationCount}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout item with reduced spacing */}
      <div className="mt-4">
        {menuItems.slice(-1).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleLogout(item.path)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isCollapsed ? "justify-center" : "justify-start",
                "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5 text-gray-500" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
