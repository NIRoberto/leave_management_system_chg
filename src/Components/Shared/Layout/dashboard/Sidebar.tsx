import React, { useState, useEffect } from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  ToolOutlined,
  SyncOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

type SidebarProps = {
  currentRole: string;
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  collapsed = false,
  onCollapseChange,
}) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    setSelectedKey(segments[segments.length - 1]);
    setOpenKeys([segments[0]]);
  }, [location]);

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    navigate(`/dashboard/${key}`);
    setSelectedKey(key);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const toggleSidebar = () => {
    onCollapseChange?.(!collapsed);
  };

  const navigation = useNavigate();

  console.log("currentRole", currentRole);

  const adminItems: MenuProps["items"] = ["admin", "ADMIN", "Admin"].includes(
    currentRole
  )
    ? [
        {
          key: "leave-approval",
          icon: <FileTextOutlined />,
          label: "Leave Approvals",
        },
        {
          key: "manage-users",
          icon: <TeamOutlined />,
          label: "Manage Users",
        },
        {
          key: "admin",
          icon: <SettingOutlined />,
          label: "Leave Settings",
          children: [
            {
              key: "manage-leave-types",
              icon: <ToolOutlined />,
              label: "Manage Types",
            },
            {
              key: "adjust-leave-balance",
              icon: <SyncOutlined />,
              label: "Adjust Balance",
            },
          ],
        },
      ]
    : [];

  const managerItems: MenuProps["items"] = ["manager", "MANAGER"].includes(
    currentRole
  )
    ? [
        {
          key: "leave-approval",
          icon: <FileTextOutlined />,
          label: "Leave Approvals",
        },
        // {
        //   key: "manage-users",
        //   icon: <TeamOutlined />,
        //   label: "Manage Users",
        // },
      ]
    : [];

  const menuItems: MenuProps["items"] = [
    {
      key: "overview",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "leave",
      icon: <CalendarOutlined />,
      label: "Leave",
      children: [
        { key: "apply-leave", label: "All Leave" },
        { key: "leave-history", label: "Leave History" },
      ],
    },
    {
      key: "team-calendar",
      icon: <TeamOutlined />,
      label: "Calendar",
    },
    {
      key: "notifications",
      icon: <BellOutlined />,
      label: "Notifications",
    },
    ...managerItems,
    ...adminItems,
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        {
          key: "profile",
          icon: <UserOutlined />,
          label: "Profile Settings",
        },
        {
          key: "change-password",
          icon: <LockOutlined />,
          label: "Change Password",
        },
      ],
    },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
    navigate("/login");
  };

  const footerButton = [
    {
      key: "logout",
      icon: <UserOutlined />,
      label: "Logout",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  useEffect(() => {
    const path = location.pathname.replace("/dashboard/", ""); // e.g., "settings/profile"
    setSelectedKey(path);

    // Automatically open dropdown for nested menu
    const rootKey = path.split("/")[0]; // e.g., "settings"
    setOpenKeys([rootKey]);
  }, [location]);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 flex flex-col justify-between h-screen transition-all duration-300 bg-main_viridian shadow-lg ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          {!collapsed && (
            <h1 className="text-xl font-bold text-white tracking-wide">
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
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleClick}
          items={menuItems}
          className="bg-transparent !text-white text-sm font-medium border-none"
        />
      </div>
      <div>
        {/* //  logout  */}

        <div className="flex items-start ">
          <Button
            type="primary"
            icon={<UserOutlined />}
            className="w-full text-white bg-main_viridian hover:bg-main_orange transition-all"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        <div className="px-4 py-2 border-t border-white/20">
          {!collapsed && (
            <Tooltip title="Leave Management System">
              <span className="text-xs text-white font-light">
                © {new Date().getFullYear()} LeaveSys
              </span>
            </Tooltip>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
