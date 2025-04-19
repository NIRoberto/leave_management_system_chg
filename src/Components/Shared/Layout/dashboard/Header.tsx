import React from "react";
import { Dropdown, Avatar, Badge, Tooltip } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  LockOutlined,
  BellOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type HeaderProps = {
  onLogout: () => void;
  onChangePassword: () => void;
  onUpdateProfile: () => void;
  username: string;
  avatarUrl?: string;
};

const Header: React.FC<HeaderProps> = ({
  onLogout,
  onChangePassword,
  onUpdateProfile,
  username,
  avatarUrl,
}) => {
  const profileItems: MenuProps["items"] = [
    {
      key: "update-profile",
      label: <span onClick={onUpdateProfile}>Update Profile</span>,
      icon: <SettingOutlined />,
    },
    {
      key: "change-password",
      label: <span onClick={onChangePassword}>Change Password</span>,
      icon: <LockOutlined />,
    },
    { type: "divider" },
    {
      key: "logout",
      label: <span onClick={onLogout}>Logout</span>,
      icon: <LogoutOutlined />,
    },
  ];

  const notifications: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex flex-col text-sm">
          <span className="font-medium">Leave Request Approved</span>
          <span className="text-xs text-gray-500">Today, 10:30 AM</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex flex-col text-sm">
          <span className="font-medium">Team Meeting at 3PM</span>
          <span className="text-xs text-gray-500">Today, 8:00 AM</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex flex-col text-sm">
          <span className="font-medium">Annual Leave Policy Updated</span>
          <span className="text-xs text-gray-500">Yesterday</span>
        </div>
      ),
    },
  ];

  return (
    <header className="w-full bg-white border-b px-4 sm:px-6 py-2 flex items-center justify-between shadow-sm">
      {/* System Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg sm:text-xl font-bold text-blue-700 whitespace-nowrap">
          Leave Management System
        </h1>

        {/* Leave Balance */}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="hidden md:flex flex-col bg-white  px-5 py-3   border-blue-100">
          <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 text-base font-semibold">
                Current:
              </span>
              <span className="text-blue-800 font-bold">8 days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-base font-semibold">
                Remaining:
              </span>
              <span className="text-green-800 font-bold">12 days</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div></div>
            <p className="text-xs text-gray-500 mt-1 ml-1">
              For the year {new Date().getFullYear()}
            </p>
          </div>
        </div>
        <Dropdown
          menu={{ items: notifications }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Badge count={3} size="small">
            <Tooltip title="Notifications">
              <BellOutlined className="text-xl cursor-pointer text-gray-700 hover:text-blue-600" />
            </Tooltip>
          </Badge>
        </Dropdown>

        {/* Profile Dropdown */}
        <Dropdown menu={{ items: profileItems }} trigger={["click"]}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar
              size="large"
              icon={!avatarUrl ? <UserOutlined /> : undefined}
              src={avatarUrl}
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{username}</p>
              <p className="text-xs text-gray-500">View options</p>
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
