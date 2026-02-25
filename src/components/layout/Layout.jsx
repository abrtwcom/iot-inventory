import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-40 md:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            W
          </div>
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

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className="flex-1 min-h-screen transition-all duration-300 ease-in-out bg-[var(--color-bg)]"
        style={{
          marginLeft: "var(--sidebar-collapsed)",
          width: "calc(100% - var(--sidebar-collapsed))",
        }}
      >
        <div className="w-full max-w-[1500px] mx-auto p-6 md:p-10 pt-20 md:pt-10">
          <Outlet />
        </div>
      </main>

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
