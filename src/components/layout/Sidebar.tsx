import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarHeader } from "./SidebarHeader";

export function Sidebar() {
  const isMobile = useIsMobile();

  return (
    <div 
      className="h-screen bg-[#F9FAFB] border-r border-gray-100 fixed left-0 top-0 flex flex-col font-inter w-64"
    >
      <SidebarHeader 
        isMobile={isMobile}
      />

      <div className="mt-8">
        <SidebarNavigation />
      </div>
    </div>
  );
}