import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Plus,
  MessageSquare,
  HelpCircle,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
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
import { useDocuments } from "@/contexts/DocumentContext";
import { cn } from "@/lib/utils";
import { SidebarNavigation } from "./SidebarNavigation";

// Mock data for businesses - in a real app, this would come from an API
const businesses = [
  { id: 1, name: "Acme Corp" },
  { id: 2, name: "TechStart Inc" },
  { id: 3, name: "Design Studio" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(businesses[0]);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { enabledDocuments } = useDocuments();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleBusinessChange = (business: typeof businesses[0]) => {
    setSelectedBusiness(business);
    console.log("Switched to business:", business.name);
  };

  const handleAddBusiness = () => {
    navigate("/onboarding/business");
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen bg-[#F9FAFB] border-r border-gray-100 fixed left-0 top-0 flex flex-col font-inter transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">C</span>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-semibold text-gray-900">Cordlo</span>
            )}
          </div>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="p-1"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between border-dashed",
                isCollapsed && "px-2"
              )}
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {!isCollapsed && (
                  <span className="truncate">{selectedBusiness.name}</span>
                )}
              </div>
              {!isCollapsed && <ChevronDown className="h-4 w-4 opacity-50" />}
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

      <SidebarNavigation
        isCollapsed={isCollapsed}
        enabledDocuments={enabledDocuments as Record<string, boolean>}
        isAccountOpen={isAccountOpen}
        toggleAccount={toggleAccount}
      />

      <div className="mt-auto space-y-1 p-4">
        <button
          onClick={() => setShowSupportModal(true)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors",
            isCollapsed && "justify-center"
          )}
        >
          <HelpCircle className="w-5 h-5 text-gray-500" />
          {!isCollapsed && "Support"}
        </button>
        <button
          onClick={() => setShowFeedbackModal(true)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors",
            isCollapsed && "justify-center"
          )}
        >
          <MessageSquare className="w-5 h-5 text-gray-500" />
          {!isCollapsed && "Feedback"}
        </button>
        <div className="pt-4 border-t border-gray-100">
          <Link
            to="/auth/signin"
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5 text-gray-500" />
            {!isCollapsed && "Sign out"}
          </Link>
        </div>
      </div>

      <SupportModal open={showSupportModal} onOpenChange={setShowSupportModal} />
      <FeedbackModal open={showFeedbackModal} onOpenChange={setShowFeedbackModal} />
    </div>
  );
}