import { Link } from "react-router-dom";

interface SidebarHeaderProps {
  isMobile: boolean;
}

export function SidebarHeader({ 
  isMobile 
}: SidebarHeaderProps) {
  const adminEmail = "admin@churchadmin.com";

  return (
    <div className="space-y-2 border-b border-gray-100">
      <div className="flex items-center p-4">
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/99fde2de-26a2-4eeb-8e7b-5fbcf5d61301.png" 
              alt="Church Logo" 
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-xl font-semibold text-gray-900 truncate">
              Church Admin
            </span>
          </div>
        </Link>
      </div>
      
      <div className="px-4 pb-2">
        <span className="text-sm text-gray-600 truncate">
          {adminEmail}
        </span>
      </div>
    </div>
  );
}