import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Package, Truck, Warehouse, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import AppLogo from "../AppLogo";

export default function Sidebar({ isOpen = false, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  // Mobile drawer is controlled by isOpen
  // Desktop sidebar collapses/expands on hover
  // We consider it "collapsed" on desktop when NOT hovered
  // On mobile, isOpen determines visibility

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

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* Logo Section */}
        <div
          className="p-4 border-b flex items-center justify-between logo-section"
          style={{ borderColor: "var(--divider)", borderBottomWidth: 1 }}
        >
          <div className="flex items-center gap-3">
            <AppLogo
              iconClass="w-10 h-10 md:w-14 md:h-14"
              textClass="text-xl font-semibold text-white sidebar-text tracking-wide"
            />
          </div>
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
                    <Icon size={22} className="flex-shrink-0" />
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
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
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
              <LogOut size={22} className="flex-shrink-0" />
              <span className="sidebar-text">Logout</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .sidebar-text {
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.2s ease, transform 0.2s ease;
          transform: translateX(0);
        }
        
        /* Desktop Hover Behavior */
        @media (min-width: 768px) {
          .sidebar {
            width: 64px;
            transition: width 0.25s ease;
            overflow: hidden;
          }
          
          .sidebar:hover {
            width: 220px;
          }

          /* Hide text when not hovered (collapsed state) */
          .sidebar:not(:hover) .sidebar-text {
            opacity: 0;
            transform: translateX(-10px);
            pointer-events: none;
            width: 0;
          }

           /* Center icons when collapsed */
          .sidebar:not(:hover) .nav-item,
          .sidebar:not(:hover) .logo-section {
             justify-content: center;
             padding-left: 0;
             padding-right: 0;
          }

          .sidebar:not(:hover) .nav-item {
             padding: 0.75rem 0;
          }
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
          position: relative;
        }
        
        .nav-item:hover {
          background: var(--divider);
          color: var(--text-primary);
        }
        
        .nav-item.active {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary-start);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
          border-left: 3px solid var(--primary-start);
        }
        
        .logout-btn {
          width: 100%;
          color: var(--text-secondary);
        }
        
        .logout-btn:hover {
          background: var(--divider);
          color: var(--text-primary);
        }
      `}</style>
    </>
  );
}

