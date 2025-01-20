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

  if (isPreviewRoute) {
    return (
      <DocumentProvider>
        <TooltipProvider>
          <div className="flex min-h-screen bg-gray-50 font-inter">
            <main className="flex-1 overflow-x-hidden bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="flex items-center justify-between px-4 h-full">
                  <div className="flex items-center gap-4">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                      <SheetTrigger asChild>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Menu className="h-6 w-6 text-gray-600" />
                        </button>
                      </SheetTrigger>
                      <SheetContent side="left" className="p-0 w-[280px]">
                        <div className="h-full overflow-y-auto">
                          <Sidebar isCollapsed={isCollapsed} />
                        </div>
                      </SheetContent>
                    </Sheet>
                    <Link to="/" className="flex items-center">
                      <div className="flex items-center gap-2">
                        <img 
                          src="/lovable-uploads/82db2e62-ebf8-45af-b2ee-7b510efb2868.png"
                          alt="Church Logo"
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <span className="text-xl font-semibold text-gray-900">Church Admin</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </header>
              <main className="flex-1 mt-16 overflow-x-hidden bg-white">
                <div className="max-w-7xl mx-auto">
                  <div className="px-4 py-6 sm:px-6 lg:px-8">
                    <Outlet />
                  </div>
                </div>
              </main>
            </>
          ) : (
            <>
              <Sidebar isCollapsed={isCollapsed} />
              <main className={`flex-1 overflow-x-hidden bg-white transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <div className="max-w-7xl mx-auto">
                  <div className="px-6 py-8">
                    <Outlet />
                  </div>
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