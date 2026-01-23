import { Link, useLocation } from "react-router-dom";
import { Home, Package, Truck, Warehouse, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/warehouse", label: "Warehouse", icon: Warehouse },
    { path: "/sender", label: "Sender Portal", icon: Package },
    { path: "/receiver", label: "Receiver Portal", icon: Truck },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="w-64 text-white min-h-screen flex flex-col bg-[var(--color-panel)] border-r"
      style={{ borderColor: "var(--divider)", borderRightWidth: 1 }}
    >
      <div
        className="p-6 border-b"
        style={{ borderColor: "var(--divider)", borderBottomWidth: 1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src="/src/assets/logo.png" alt="WareHub" className="h-8 w-auto" />
            <div>
              <h1 className="text-xl font-bold">WareHub</h1>
              <p className="text-sm text-gray-400 mt-1">Status Monitor</p>
            </div>
          </div>
        </div>
        {/* Theme is fixed to dark by default - ThemeToggle removed */}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                      ? "text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  style={
                    isActive(item.path)
                      ? {
                        backgroundImage: "var(--color-primary)",
                        boxShadow: "0 8px 20px rgba(2,6,23,0.4)",
                      }
                      : {}
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {user && (
        <div className="p-4 border-t border-gray-700">
          <div className="mb-3 px-4">
            <p className="text-sm font-medium">{user.email}</p>
            {user.role && (
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            )}
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
