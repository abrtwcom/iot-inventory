import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Package, Truck, Warehouse, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import AppLogo from "../AppLogo";

export default function Sidebar({ isOpen = false, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/warehouse", label: "Warehouse", icon: Warehouse },
    { path: "/sender", label: "Sender Portal", icon: Package },
    { path: "/receiver", label: "Receiver Portal", icon: Truck },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""} ${isCollapsed ? "sidebar-collapsed" : ""}`}>

        {/* Logo Section */}
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: "var(--divider)", borderBottomWidth: 1 }}
        >
          <div className="flex items-center gap-3">
            <AppLogo
              iconClass="w-8 h-8 md:w-10 md:h-10"
              textClass="text-lg font-bold text-white sidebar-text"
            />
          </div>

          {/* Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            className="collapse-btn"
            title={isCollapsed ? "Expand sidebar" : "Minimize sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4" style={{ marginTop: "0.5rem" }}>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleNavClick}
                    className={`nav-item ${isActive(item.path) ? "active" : ""}`}
                  >
                    <Icon size={20} />
                    <span className="sidebar-text">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        {user && (
          <div
            className="p-4 border-t"
            style={{
              borderColor: "var(--divider)",
              borderTopWidth: 1,
              background: "var(--color-panel)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background: "var(--color-primary)",
                }}
              >
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="sidebar-text flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.email}
                </p>
                {user.role && (
                  <p className="text-xs text-gray-400 capitalize">
                    {user.role}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={logout}
              className="nav-item logout-btn"
            >
              <LogOut size={20} />
              <span className="sidebar-text">Logout</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .sidebar-text {
          transition: opacity 0.2s ease;
        }
        
        .collapse-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .collapse-btn:hover {
          background: var(--divider);
          color: var(--text-primary);
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
          width: 100%;
        }
        
        .nav-item:hover {
          background: var(--divider);
          color: var(--text-primary);
        }
        
        .nav-item.active {
          background: var(--color-primary);
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        
        .logout-btn {
          width: 100%;
          color: var(--text-secondary);
        }
        
        .logout-btn:hover {
          background: var(--divider);
          color: var(--text-primary);
        }
        
        /* Collapsed state */
        .sidebar-collapsed .sidebar-text {
          opacity: 0;
          width: 0;
          overflow: hidden;
        }
        
        .sidebar-collapsed {
          width: 80px !important;
        }
        
        .sidebar-collapsed .collapse-btn {
          position: absolute;
          right: -12px;
          top: 5rem;
          background: var(--color-panel);
          border: 1px solid var(--divider);
          border-radius: 50%;
          z-index: 10;
        }
        
        .sidebar-collapsed .nav-item {
          justify-content: center;
          padding: 0.75rem;
        }
        
        .sidebar-collapsed .p-4.border-b,
        .sidebar-collapsed .p-4.border-t {
          padding: 1rem !important;
        }
        
        .sidebar-collapsed .flex.items-center.gap-3 {
          justify-content: center;
        }
        
        @media (max-width: 767px) {
          .sidebar-collapsed {
            width: var(--sidebar-width) !important;
          }
          
          .sidebar-collapsed .sidebar-text {
            opacity: 1;
            width: auto;
          }
          
          .sidebar-collapsed .nav-item {
            justify-content: flex-start;
            padding: 0.75rem 1rem;
          }
          
          .sidebar-collapsed .collapse-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

