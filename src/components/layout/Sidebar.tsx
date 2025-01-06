import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Plus,
  MessageSquare,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { SupportModal } from "../modals/SupportModal";
import { FeedbackModal } from "../modals/FeedbackModal";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDocuments } from "@/contexts/DocumentContext";
import { cn } from "@/lib/utils";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarHeader } from "./SidebarHeader";

export function Sidebar({ onCollapse }: { onCollapse?: (collapsed: boolean) => void }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { enabledDocuments } = useDocuments();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [businessData, setBusinessData] = useState<any>({
    businessName: "My Business",
    logo: null,
    businessType: "freelancing"
  });

  useEffect(() => {
    const loadBusinessData = () => {
      const data = localStorage.getItem('businessData');
      if (data) {
        const parsedData = JSON.parse(data);
        setBusinessData(parsedData);
      }
    };

    loadBusinessData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'businessData') {
        loadBusinessData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAddBusiness = () => {
    navigate("/onboarding/business");
  };

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const toggleSidebar = () => {
    if (!isMobile) {
      const newCollapsedState = !isCollapsed;
      setIsCollapsed(newCollapsedState);
      onCollapse?.(newCollapsedState);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      onCollapse?.(isCollapsed && !isHovered);
    }
  }, [isCollapsed, isHovered, onCollapse, isMobile]);

  const handleMouseEnter = () => {
    if (isCollapsed && !isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed && !isMobile) {
      setIsHovered(false);
    }
  };

  return (
    <div 
      className={cn(
        "h-screen bg-[#F9FAFB] border-r border-gray-100 fixed left-0 top-0 flex flex-col font-inter transition-all duration-300",
        isCollapsed && !isHovered ? "w-20" : "w-64"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarHeader 
        businessData={businessData}
        isCollapsed={isCollapsed && !isHovered}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />

      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between border-dashed",
                isCollapsed && !isHovered && "px-2"
              )}
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {(!isCollapsed || isHovered) && (
                  <span className="truncate">{businessData.businessName || "My Business"}</span>
                )}
              </div>
              {(!isCollapsed || isHovered) && <ChevronDown className="h-4 w-4 opacity-50" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--trigger-width]">
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
        isCollapsed={isCollapsed && !isHovered}
        enabledDocuments={enabledDocuments}
        isAccountOpen={isAccountOpen}
        toggleAccount={toggleAccount}
      />

      <div className="mt-auto space-y-1 p-4">
        <button
          onClick={() => setShowSupportModal(true)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors",
            isCollapsed && !isHovered && "justify-center"
          )}
        >
          <HelpCircle className="w-5 h-5 text-gray-500" />
          {(!isCollapsed || isHovered) && "Support"}
        </button>
        <button
          onClick={() => setShowFeedbackModal(true)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors",
            isCollapsed && !isHovered && "justify-center"
          )}
        >
          <MessageSquare className="w-5 h-5 text-gray-500" />
          {(!isCollapsed || isHovered) && "Feedback"}
        </button>
        <div className="pt-4 border-t border-gray-100">
          <Link
            to="/auth/signin"
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors",
              isCollapsed && !isHovered && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5 text-gray-500" />
            {(!isCollapsed || isHovered) && "Sign out"}
          </Link>
        </div>
      </div>

      <SupportModal open={showSupportModal} onOpenChange={setShowSupportModal} />
      <FeedbackModal open={showFeedbackModal} onOpenChange={setShowFeedbackModal} />
    </div>
  );
}