import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FileText,
  LayoutDashboard,
  Receipt,
  CreditCard,
  Users,
  BarChart,
  Settings,
  LogOut,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Building2,
  Plus,
  ChevronRight,
} from "lucide-react";
import { SupportModal } from "../modals/SupportModal";
import { FeedbackModal } from "../modals/FeedbackModal";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  enabledDocuments: {
    invoices: boolean;
    estimates: boolean;
    receipts: boolean;
  };
}

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/" },
  { icon: FileText, label: "Invoices", path: "/invoices", type: "invoices" },
  { icon: FileText, label: "Estimates", path: "/estimates", type: "estimates" },
  { icon: Receipt, label: "Receipts", path: "/receipts", type: "receipts" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
];

const accountMenuItems = [
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: BarChart, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

// Mock data for businesses - in a real app, this would come from an API
const businesses = [
  { id: 1, name: "Acme Corp" },
  { id: 2, name: "TechStart Inc" },
  { id: 3, name: "Design Studio" },
];

export function Sidebar({ enabledDocuments }: SidebarProps) {
  const location = useLocation();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(businesses[0]);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleBusinessChange = (business: typeof businesses[0]) => {
    setSelectedBusiness(business);
    console.log("Switched to business:", business.name);
  };

  const handleAddBusiness = () => {
    console.log("Add new business clicked");
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  // Filter menu items based on enabled documents
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.type) return true; // Keep items without a type (Overview, Payments)
    return enabledDocuments[item.type as keyof typeof enabledDocuments];
  });

  return (
    <div className="h-screen w-64 bg-[#F9FAFB] border-r border-gray-100 p-6 fixed left-0 top-0 flex flex-col font-inter">
      <div className="mb-4">
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">C</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Cordlo</span>
          </div>
        </Link>
      </div>

      <div className="mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between border-dashed"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="truncate">{selectedBusiness.name}</span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--trigger-width]">
            {businesses.map((business) => (
              <DropdownMenuItem
                key={business.id}
                onClick={() => handleBusinessChange(business)}
                className="cursor-pointer"
              >
                {business.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleAddBusiness}
              className="cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add new business
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
              {item.label}
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
              <span>Account</span>
            </div>
            <ChevronRight
              className={cn(
                "w-4 h-4 transition-transform",
                isAccountOpen ? "rotate-90" : ""
              )}
            />
          </button>

          {/* Account Submenu */}
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
        </div>
      </nav>

      <div className="mt-auto space-y-1">
        <button
          onClick={() => setShowSupportModal(true)}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-gray-500" />
          Support
        </button>
        <button
          onClick={() => setShowFeedbackModal(true)}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <MessageSquare className="w-5 h-5 text-gray-500" />
          Feedback
        </button>
        <div className="pt-4 border-t border-gray-100">
          <Link
            to="/auth/signin"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-500" />
            Sign out
          </Link>
        </div>
      </div>

      <SupportModal open={showSupportModal} onOpenChange={setShowSupportModal} />
      <FeedbackModal open={showFeedbackModal} onOpenChange={setShowFeedbackModal} />
    </div>
  );
}