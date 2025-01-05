import { Link } from "react-router-dom";

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
  return (
    <div className="mb-4">
      <Link to="/" className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">C</span>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-semibold text-gray-900">Cordlo</span>
          )}
        </div>
      </Link>
    </div>
  );
}