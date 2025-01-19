import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DocumentProvider } from "@/contexts/DocumentContext";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Layout() {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const isPreviewRoute = location.pathname.includes('/preview');

  const handleSidebarCollapse = (collapsed: boolean) => {
    if (!isMobile) {
      setIsCollapsed(collapsed);
    }
  };

  if (isPreviewRoute) {
    return (
      <DocumentProvider>
        <TooltipProvider>
          <div className="flex min-h-screen bg-gray-50 font-inter">
            <main className="flex-1 overflow-x-hidden bg-white">
              <div className="max-w-7xl mx-auto px-2.5">
                <Outlet />
              </div>
            </main>
            <Toaster />
          </div>
        </TooltipProvider>
      </DocumentProvider>
    );
  }

  return (
    <DocumentProvider>
      <TooltipProvider>
        <div className="flex min-h-screen bg-gray-50 font-inter">
          {isMobile ? (
            <>
              <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50">
                <div className="flex items-center justify-between px-2.5 h-full">
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
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-semibold">C</span>
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Church Admin</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </header>
              <main className="flex-1 px-2.5 py-4 md:p-8 mt-16 overflow-x-hidden bg-white">
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
      </TooltipProvider>
    </DocumentProvider>
  );
}