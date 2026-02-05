import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-40 md:hidden">
        <div className="flex items-center gap-3">
          {/* Simple logo placeholder for mobile */}
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">W</div>
          <span className="font-bold text-lg text-white">WareHub</span>
        </div>
        <button
          className="p-2 text-slate-300 hover:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main
        className="flex-1 min-h-screen transition-all duration-300 ease-in-out"
        style={{
          marginLeft: "var(--sidebar-collapsed)", // Default for desktop
          width: `calc(100% - var(--sidebar-collapsed))`
        }}
      >
        <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Style adjustment for mobile where sidebar doesn't take space */}
      <style>{`
        @media (max-width: 768px) {
            main {
                margin-left: 0 !important;
                width: 100% !important;
            }
        }
      `}</style>
    </div>
  );
}

