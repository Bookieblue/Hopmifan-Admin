import { Building2, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface SidebarBusinessSelectorProps {
  isCollapsed: boolean;
  selectedBusiness: { id: number; name: string };
  businesses: Array<{ id: number; name: string }>;
  onBusinessChange: (business: { id: number; name: string }) => void;
}

export function SidebarBusinessSelector({
  isCollapsed,
  selectedBusiness,
  businesses,
  onBusinessChange,
}: SidebarBusinessSelectorProps) {
  const navigate = useNavigate();

  const handleAddBusiness = () => {
    navigate("/onboarding/business");
  };

  if (isCollapsed) {
    return (
      <Button
        variant="outline"
        className="w-full justify-center border-dashed mb-6"
        onClick={() => onBusinessChange(selectedBusiness)}
      >
        <Building2 className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between border-dashed">
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
              onClick={() => onBusinessChange(business)}
              className="cursor-pointer"
            >
              {business.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleAddBusiness} className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add new business
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}