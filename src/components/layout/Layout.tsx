import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Layout() {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      <Sidebar />
      <main className={`flex-1 ${isMobile ? 'ml-0' : 'ml-64'} p-4 md:p-8 overflow-x-hidden`}>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
}