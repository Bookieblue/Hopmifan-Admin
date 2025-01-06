import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  businessName: string;
  logo: string | null;
  isCollapsed: boolean;
}

export function SidebarHeader({ businessName, logo, isCollapsed }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <Link to="/" className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <img 
              src="/lovable-uploads/3fc3fdd6-1b6b-416c-af07-26a503b6bdc4.png"
              alt="Cordlo logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-semibold text-gray-900 truncate">
              {businessName}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}