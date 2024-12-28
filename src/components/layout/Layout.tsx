import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export function Layout() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {isMobile ? (
        <>
          <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-40">
            <Link to="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">C</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">Cordlo</span>
              </div>
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 sm:w-80">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </header>
          <main className="flex-1 pt-16 p-4 md:p-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <>
          <div className="w-64 shrink-0">
            <Sidebar />
          </div>
          <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
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