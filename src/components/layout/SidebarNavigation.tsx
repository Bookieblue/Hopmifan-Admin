import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  Users,
  Calendar,
  Speaker,
  Mail,
  DollarSign,
  BookOpen,
  Newspaper,
  Mail as PrayerIcon,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutGrid, label: "Overview", path: "/" },
  {
    icon: FileText,
    label: "Publications",
    path: "/publications",
    submenu: [
      { label: "Blog", path: "/publications/blog", icon: Newspaper },
      { label: "Bookstore", path: "/publications/bookstore", icon: BookOpen }
    ]
  },
  { icon: Users, label: "Members", path: "/members" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Speaker, label: "Sermons", path: "/sermons" },
  { icon: Mail, label: "Contact", path: "/contact" },
  { icon: DollarSign, label: "Donations", path: "/donations" },
  { icon: PrayerIcon, label: "Prayer Requests", path: "/prayer-requests" },
  { icon: CreditCard, label: "Payments", path: "/payments" }
];

export function SidebarNavigation() {
  const location = useLocation();

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
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-5 h-5 text-gray-500" />
                  <span>{item.label}</span>
                </button>
                {item.submenu && (
                  <div className="pl-4 space-y-1 mt-1">
                    {item.submenu.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;
                      const SubIcon = subItem.icon;
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