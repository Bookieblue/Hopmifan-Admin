import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export function SidebarHeader({ 
  isCollapsed, 
  isMobile, 
  toggleSidebar 
}: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <Link to="/" className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-semibold text-gray-900 truncate">
              Church Admin
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
  );
}