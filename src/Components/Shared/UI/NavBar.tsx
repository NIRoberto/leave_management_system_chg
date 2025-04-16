import { Link } from "react-router-dom";
import { Menu, User, LogOut } from "lucide-react";
import { useState } from "react";

interface DashboardNavbarProps {
  onToggleSidebar?: () => void;
  username?: string;
}

const DashboardNavbar = ({
  onToggleSidebar,
  username = "John Doe",
}: DashboardNavbarProps) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const handleLogout = () => {
    // Add logout logic here (e.g., clear token, redirect)
    console.log("Logging out...");
  };

  return (
    <header className="w-full bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Left: Toggle Button & Brand */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-gray-600 hover:text-blue-600"
          >
            <Menu size={24} />
          </button>
        )}
        <Link
          to="/dashboard/overview"
          className="text-xl font-bold text-blue-700"
        >
          Dashboard
        </Link>
      </div>

      {/* Right: User */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-700"
        >
          <User size={20} />
          <span className="hidden sm:inline">{username}</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
            <Link
              to="/dashboard/settings"
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
            >
              <div className="flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </div>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
