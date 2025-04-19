import React, { useState, useEffect } from "react";
import { Menu, Tooltip } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "../types/role";

type SidebarProps = {
  currentRole: Role;
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  collapsed = false,
  onCollapseChange,
}) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setSelectedKey(path);
  }, [location]);

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const toggleSidebar = () => {
    onCollapseChange?.(!collapsed);
  };

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    navigate(`/${key}`);
    setSelectedKey(key);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "leave",
      icon: <CalendarOutlined />,
      label: "Leave",
      children: [
        { key: "apply-leave", label: "Apply for Leave" },
        { key: "leave-history", label: "Leave History" },
      ],
    },
    {
      key: "team",
      icon: <TeamOutlined />,
      label: "Team Calendar",
      children: [
        { key: "team-overview", label: "Overview" },
        { key: "department", label: "By Department" },
      ],
    },
    ...(currentRole === "admin" || currentRole === "manager"
      ? [
          {
            key: "approvals",
            icon: <FileTextOutlined />,
            label: "Leave Approvals",
          },
        ]
      : []),
    ...(currentRole === "admin"
      ? [
          {
            key: "admin",
            icon: <SettingOutlined />,
            label: "Admin Panel",
            children: [
              { key: "manage-leaves", label: "Manage Leave Types" },
              { key: "reports", label: "Reports" },
            ],
          },
        ]
      : []),
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        { key: "profile-settings", label: "Profile Settings" },
        { key: "account-settings", label: "Account Settings" },
      ],
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ];

  const menuItemsForFooter: MenuProps["items"] = [
    {
      key: "logout",
      icon: <UserOutlined />,
      label: "Logout",
    },
  ];

  return (
    <aside
      className={`fixed flex flex-col justify-between top-0 left-0 z-40 h-screen transition-all duration-300 bg-main_olivine text-white shadow-lg ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          {!collapsed && (
            <h1 className="text-xl font-semibold tracking-wide text-white">
              LeaveSys
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white text-xl hover:text-yellow-300 transition-all"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>

        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onClick={handleClick}
          onOpenChange={handleOpenChange}
          items={menuItems}
          className="bg-transparent text-sm font-medium border-none"
        />
      </div>
      <div className="mt-auto mx-auto">
        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onClick={handleClick}
          onOpenChange={handleOpenChange}
          items={menuItemsForFooter}
          className="bg-transparent text-sm font-medium border-none"
        />
        {/* Footer */}
        <div className="flex items-center justify-center p-4 border-t border-white/20">
          {!collapsed && (
            <Tooltip title="Leave Management System" placement="top">
              <span className="text-xs font-medium text-white">
                © ${new Date().getFullYear()} LeaveSys
              </span>
            </Tooltip>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
