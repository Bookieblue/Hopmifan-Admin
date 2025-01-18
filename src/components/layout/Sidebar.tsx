import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarHeader } from "./SidebarHeader";

export function Sidebar({ onCollapse }: { onCollapse?: (collapsed: boolean) => void }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
        isCollapsed={isCollapsed && !isHovered}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />

      <SidebarNavigation
        isCollapsed={isCollapsed && !isHovered}
      />

      <div className="mt-auto p-4">
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
    </div>
  );
}