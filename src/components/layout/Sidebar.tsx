import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarBusinessSelector } from "./SidebarBusinessSelector";
import { SidebarNavigation } from "./SidebarNavigation";
import { cn } from "@/lib/utils";

// Mock data for businesses - in a real app, this would come from an API
const businesses = [
  { id: 1, name: "Acme Corp" },
  { id: 2, name: "TechStart Inc" },
  { id: 3, name: "Design Studio" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(businesses[0]);

  const handleBusinessChange = (business: typeof businesses[0]) => {
    setSelectedBusiness(business);
    console.log("Switched to business:", business.name);
  };

  return (
    <div
      className={cn(
        "h-screen bg-[#F9FAFB] border-r border-gray-100 fixed left-0 top-0 flex flex-col font-inter transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex-1 flex flex-col relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 bg-white border shadow-sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </Button>

        <SidebarHeader isCollapsed={isCollapsed} />
        
        <SidebarBusinessSelector
          isCollapsed={isCollapsed}
          selectedBusiness={selectedBusiness}
          businesses={businesses}
          onBusinessChange={handleBusinessChange}
        />

        <SidebarNavigation isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}