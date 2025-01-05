import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DocumentProvider } from "@/contexts/DocumentContext";

export function Layout() {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  // Check if current route is preview
  const isPreviewRoute = location.pathname.includes('/preview');
  
  // Mock current business data - in a real app, this would come from a context or state management
  const currentBusiness = {
    name: "Acme Corp",
    logo: null // Set to null to test the fallback letter
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    if (!isMobile) {
      setIsCollapsed(collapsed);
    }
  };

  // If it's preview route, render without sidebar
  if (isPreviewRoute) {
    return (
      <DocumentProvider>
        <div className="flex min-h-screen bg-gray-50 font-inter">
          <main className="flex-1 overflow-x-hidden bg-white">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
          <Toaster />
        </div>
      </DocumentProvider>
    );
  }

  return (
    <DocumentProvider>
      <div className="flex min-h-screen bg-gray-50 font-inter">
        {isMobile ? (
          <>
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50">
              <div className="flex items-center justify-between pr-4 h-full">
                <div className="flex items-center gap-4">
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Menu className="h-6 w-6 text-gray-600" />
                      </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-[280px]">
                      <div className="h-full overflow-y-auto">
                        <Sidebar onCollapse={handleSidebarCollapse} />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <Link to="/" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">C</span>
                      </div>
                      <span className="text-xl font-semibold text-gray-900">Cordlo</span>
                    </div>
                  </Link>
                </div>
                <div className="flex items-center">
                  {currentBusiness.logo ? (
                    <img 
                      src={currentBusiness.logo} 
                      alt={`${currentBusiness.name} logo`}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-semibold">
                        {currentBusiness.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </header>
            <main className="flex-1 p-4 md:p-8 mt-16 overflow-x-hidden bg-white">
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </main>
          </>
        ) : (
          <>
            <Sidebar onCollapse={handleSidebarCollapse} />
            <main className={`flex-1 p-4 md:p-8 overflow-x-hidden bg-white transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </main>
          </>
        )}
        <Toaster />
      </div>
    </DocumentProvider>
  );
}