import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Receipt,
  CreditCard,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SidebarNavigation({ isCollapsed }: { isCollapsed: boolean }) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Invoices",
      href: "/invoices",
      icon: FileText,
    },
    {
      name: "Customers",
      href: "/customers",
      icon: Users,
    },
    {
      name: "Receipts",
      href: "/receipts",
      icon: Receipt,
    },
    {
      name: "Payments",
      href: "/payments",
      icon: CreditCard,
    },
    {
      name: "Articles",
      href: "/articles",
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-4 py-4">
      <div className="px-4 py-8">
        <Link to="/">
          <img
            src="/lovable-uploads/43d04b44-fc73-46eb-8543-89f240871e1d.png"
            alt="Logo"
            className="h-8"
          />
        </Link>
      </div>
      <div className="px-3">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isActive(item.href) && "bg-accent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {!isCollapsed && item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}