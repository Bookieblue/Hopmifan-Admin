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
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Default placeholder image from Unsplash
const DEFAULT_LOGO = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";

export function Sidebar({ onCollapse }: { onCollapse?: (collapsed: boolean) => void }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { enabledDocuments } = useDocuments();
  const [isCollapsed, setIsCollapsed] = useState(false);
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

    // Load initial data
    loadBusinessData();

    // Set up storage event listener for real-time updates
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
      onCollapse?.(isCollapsed);
    }
  }, [isCollapsed, onCollapse, isMobile]);

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
            {businessData.logo ? (
              <img 
                src={businessData.logo} 
                alt="Business logo" 
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <img 
                  src={DEFAULT_LOGO}
                  alt="Default logo"
                  className="w-8 h-8 rounded-lg object-cover"
                />
              </div>
            )}
            {!isCollapsed && (
              <span className="text-xl font-semibold text-gray-900 truncate">
                {businessData.businessName || "My Business"}
              </span>
            )}
          </div>
        </Link>
        {!isMobile && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 transition-colors"
                onClick={toggleSidebar}
              >
                {isCollapsed ? (
                  <PanelLeft className="h-4 w-4 text-gray-600" />
                ) : (
                  <PanelLeftClose className="h-4 w-4 text-gray-600" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</p>
            </TooltipContent>
          </Tooltip>
        )}
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
                  <span className="truncate">{businessData.businessName || "My Business"}</span>
                )}
              </div>
              {!isCollapsed && <ChevronDown className="h-4 w-4 opacity-50" />}
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
        isCollapsed={isCollapsed}
        enabledDocuments={enabledDocuments}
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