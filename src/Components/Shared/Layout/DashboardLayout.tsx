import React, { useState, useEffect } from "react";
import Sidebar from "./Dashboard/Sidebar";
import Header from "./Dashboard/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Provider/AppProvider";
import { Cookie } from "lucide-react";
import { StorageKeys } from "../../../Config/StorageKeys";
import Cookies from "js-cookie";
import { Notify } from "notiflix";
import { Role } from "../../Types/usersTypes";

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const { LoggedInUser, isLoggedInUserLoading, isLoggedInUserError, roles } =
    useAppContext();

  const [currentRole, setCurrentRole] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (roles) {
      const foundRole = LoggedInUser?.role;
      if (foundRole) {
        setCurrentRole(foundRole.name);
      }
    }
  }, [roles, LoggedInUser]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 transition-all duration-300">
      {/* Sidebar */}
      <Sidebar
        currentRole={currentRole || "staff"}
        collapsed={collapsed}
        onCollapseChange={setCollapsed}
      />
      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Header
          onLogout={() => {
            localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
            Cookies.remove(StorageKeys.ACCESS_TOKEN);
            Notify.success("Logout successful");
            setTimeout(() => {
              navigation("/login");
            }, 1500);
          }}
          onChangePassword={() => {
            navigation("/dashboard/change-password");
          }}
          onUpdateProfile={() => {
            navigation("/dashboard/profile");
          }}
          username={
            LoggedInUser?.first_name && LoggedInUser?.last_name
              ? ` ${LoggedInUser?.last_name[0].toUpperCase()} ${
                  LoggedInUser?.first_name
                }`
              : "User"
          }
          avatarUrl="https://res.cloudinary.com/nrob/image/upload/v1721084009/tip%20top%20consultancy/xorguxv2x1bwferxtkfo.webp"
        />
        <main className="p-6 sm:p-8 max-h-[93vh] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
