import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { Role } from "./types/role";

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userRole: Role = "admin";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? 64 : 256;

  const navigation = useNavigate();

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
        <Header
          onLogout={() => {}}
          onChangePassword={() => {
            navigation("/dashboard/change-password");
          }}
          onUpdateProfile={() => {
            navigation("/dashboard/profile");
          }}
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
