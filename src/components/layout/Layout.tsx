import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export function Layout() {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {isMobile ? (
        <>
          <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50">
            <div className="flex items-center justify-between px-4 h-full">
              <Link to="/" className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold">C</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-900">Cordlo</span>
                </div>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Menu className="h-6 w-6 text-gray-600" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px]">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8 mt-16 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <>
          <Sidebar />
          <main className="flex-1 ml-64 p-4 md:p-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </>
      )}
      <Toaster />
    </div>
  );
}