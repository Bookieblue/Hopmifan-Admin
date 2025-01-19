import { Link } from "react-router-dom";

interface SidebarHeaderProps {
  isMobile: boolean;
}

export function SidebarHeader({ 
  isMobile 
}: SidebarHeaderProps) {
  return (
    <div className="flex items-center p-4 border-b border-gray-100">
      <Link to="/" className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-xl font-semibold text-gray-900 truncate">
            Church Admin
          </span>
        </div>
      </Link>
    </div>
  );
}