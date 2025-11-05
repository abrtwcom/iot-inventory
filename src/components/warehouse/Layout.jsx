import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    // Use the app-level dark background variable for the full layout so there are no
    // light gutters on the left/right. Cards and panels keep their own panel/card styles.
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[var(--color-bg)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
