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
  X,
  ChevronDown,
  Building2,
  Plus,
} from "lucide-react";
import { SupportModal } from "../modals/SupportModal";
import { FeedbackModal } from "../modals/FeedbackModal";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Invoices", path: "/invoices" },
  { icon: FileText, label: "Estimates", path: "/estimates" },
  { icon: Receipt, label: "Receipts", path: "/receipts" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: BarChart, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState("My Business Name");

  // Mock business data - in a real app, this would come from an API
  const businesses = [
    { id: 1, name: "My Business Name" },
    { id: 2, name: "Second Business" },
    { id: 3, name: "Third Business" },
  ];

  return (
    <div className="h-screen w-64 bg-[#F9FAFB] border-r border-gray-100 p-6 flex flex-col font-inter relative">
      {/* Close button for mobile */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg md:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      )}

      <div className="mb-4 md:block">
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">C</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Cordlo</span>
          </div>
        </Link>
      </div>

      {/* Business Selector */}
      <div className="mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal border-dashed"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="truncate">{selectedBusiness}</span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--trigger-width]">
            {businesses.map((business) => (
              <DropdownMenuItem
                key={business.id}
                onClick={() => setSelectedBusiness(business.name)}
              >
                {business.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="gap-2">
              <Plus className="h-4 w-4" />
              Add new business
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
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