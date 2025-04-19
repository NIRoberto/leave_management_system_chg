import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import { Outlet } from "react-router-dom";
import { Role } from "./types/role";

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userRole: Role = "admin"; // Replace with actual user role from auth context

  // Update the sidebar collapsed state based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile screen width threshold
      if (window.innerWidth <= 768) {
        setCollapsed(true); // Automatically collapse on mobile
      } else {
        setCollapsed(false); // Uncollapse on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? 64 : 256;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 transition-all duration-300">
      {/* Sidebar */}
      <Sidebar
        currentRole={userRole}
        collapsed={collapsed}
        onCollapseChange={setCollapsed}
      />
      {/* Main Content */}
      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Header */}
        <Header
          onLogout={() => {}}
          onChangePassword={() => {}}
          onUpdateProfile={() => {}}
          username="Jane Doe"
          avatarUrl="https://i.pravatar.cc/150?img=4"
        />
        <main className="p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
