import React from "react";
import { Dropdown, Avatar, Badge, Tooltip } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  LockOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

// components/Clock.tsx

import { useEffect, useState } from "react";

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
      key: "dashboard/settings/profile",
      label: <span onClick={onUpdateProfile}>Update Profile</span>,
      icon: <SettingOutlined />,
    },
    {
      key: "dashboard/settings/change-password",
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
        <div className="flex items-start gap-3 text-sm">
          <CheckCircleOutlined className="text-green-500 mt-1" />
          <div>
            <p className="font-medium text-gray-800">
              Your{" "}
              <span className="text-blue-600 font-semibold">leave request</span>{" "}
              was approved.
            </p>
            <p className="text-xs text-gray-500">Today at 10:30 AM</p>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-start gap-3 text-sm">
          <CalendarOutlined className="text-blue-500 mt-1" />
          <div>
            <p className="font-medium text-gray-800">
              You have a{" "}
              <span className="text-blue-600 font-semibold">team meeting</span>{" "}
              scheduled.
            </p>
            <p className="text-xs text-gray-500">Today at 3:00 PM</p>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex items-start gap-3 text-sm">
          <InfoCircleOutlined className="text-yellow-500 mt-1" />
          <div>
            <p className="font-medium text-gray-800">
              <span className="text-yellow-600 font-semibold">
                Annual leave policy
              </span>{" "}
              has been updated.
            </p>
            <p className="text-xs text-gray-500">Yesterday at 4:15 PM</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <header className="w-full bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
      {/* System Title */}
      <div className="flex items-center gap-3">
        {/* Logo/Icon */}
        <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 9h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Text Branding */}
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-blue-700">
            {/* Greeting based on time  */}
            {(() => {
              const hour = new Date().getHours();
              if (hour < 12) return "Good Morning";
              else if (hour < 18) return "Good Afternoon";
              else return "Good Evening";
            })()}
            , {username.split(" ")[0]}!
          </h1>
          <span className="text-xs text-gray-500">
            Plan. Request. Manage your leave.
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between   px-6 py-3   shadow-sm transition hover:shadow-md gap-6 min-w-[320px]">
        {/* Leave Summary */}
        {/* <div className="flex flex-col">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-1.5">
              <span className="text-blue-600 font-semibold">Current:</span>
              <span className="text-blue-900 font-bold">8 days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-green-600 font-semibold">Remaining:</span>
              <span className="text-green-800 font-bold">12 days</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            For the year {new Date().getFullYear()}
          </p>
        </div> */}

        {/* Clock */}
        {/* <div className="border-l border-blue-200 pl-4 ml-4">
          <Clock showDate={true} format24Hour={false} />
        </div> */}
      </div>

      <div className="flex items-center gap-4">
        {/* Leave Balance */}

        {/* Notifications */}
        <Dropdown
          menu={{ items: notifications }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Badge count={3} size="small">
            <Tooltip title="Notifications">
              <BellOutlined className="text-xl cursor-pointer text-gray-700 hover:text-blue-600 transition duration-200" />
            </Tooltip>
          </Badge>
        </Dropdown>

        {/* User Dropdown */}
        <Dropdown menu={{ items: profileItems }} trigger={["click"]}>
          <div className="flex items-center gap-2 cursor-pointer transition hover:bg-gray-100 px-2 py-1 rounded-md">
            <Avatar
              size="large"
              icon={!avatarUrl ? <UserOutlined /> : undefined}
              src={avatarUrl}
              className="border"
            />
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-gray-800">{username}</p>
              <p className="text-xs text-gray-500">Account Options</p>
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;

type ClockProps = {
  showDate?: boolean;
  format24Hour?: boolean;
  className?: string;
};

const Clock: React.FC<ClockProps> = ({
  showDate = false,
  format24Hour = false,
  className = "",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !format24Hour,
      });

      const date = now.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      setCurrentTime(showDate ? `${date} • ${time}` : time);
    };

    updateClock(); // run immediately
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [showDate, format24Hour]);

  return (
    <div
      className={`px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700 shadow-sm ${className}`}
    >
      <span className="text-blue-700">{currentTime}</span>
    </div>
  );
};
