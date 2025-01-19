import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarHeader } from "./SidebarHeader";

interface SidebarProps {
  isCollapsed?: boolean;
}

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const isMobile = useIsMobile();

  return (
    <div 
      className={cn(
        "h-screen bg-[#F9FAFB] border-r border-gray-100 fixed left-0 top-0 flex flex-col font-inter",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <SidebarHeader 
        isMobile={isMobile}
      />

      <div className="mt-16">
        <SidebarNavigation isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}