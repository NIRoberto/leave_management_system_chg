import React, { JSX } from "react";
import { Dropdown, Avatar, Badge, Tooltip, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  LockOutlined,
  BellOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

// components/Clock.tsx

import { useEffect, useState } from "react";
import { useAppContext } from "../../../../Provider/AppProvider";
import dayjs from "dayjs";
import { useUpdateStatusData } from "../../../../Hooks/apiHooks";
import { useNavigate } from "react-router";

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
  const { notificationsData, isLoadingNotifications, isNotificationsError } =
    useAppContext();

  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  const navigation = useNavigate();

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

  const iconMap: Record<string, JSX.Element> = {
    CheckCircleOutlined: <CheckCircleOutlined />,
    CalendarOutlined: <CalendarOutlined />,
    InfoCircleOutlined: <InfoCircleOutlined />,
    ExclamationCircleOutlined: <ExclamationCircleOutlined />,
  };

  const [selectedNotification, setSelectedNotification] = useState<
    string | null
  >(null);

  const {
    mutate: markAsRead,
    isPending,
    error: markAsReadError,
  } = useUpdateStatusData(`notifications/${selectedNotification}/read`);

  const handleMarkAllAsRead = () => {
    // Logic to mark all notifications as read

    console.log("Mark all as read");
  };

  const handleClickOnNotification = (key: string) => {
    setSelectedNotification(key);

    markAsRead(
      { data: key },
      {
        onSuccess: () => {
          console.log("Notification marked as read:", key);
          setSelectedNotification(null);
          setIsNotificationDropdownOpen(false);
          navigation("/dashboard/apply-leave");
        },
        onError: (error) => {
          console.error("Error marking notification as read:", error);
        },
      }
    );
  };
  const notifications: MenuProps["items"] = notificationsData?.map(
    (notification: any) => {
      const {
        id,
        message,
        createdAt,
        isRead,
        notificationType: { icon, color },
      } = notification;

      return {
        key: id.toString(),
        label: (
          <div
            className={`group cursor-pointer  flex items-start gap-4 px-4 py-3 !rounded-lg border ${
              isRead
                ? "bg-white border-transparent"
                : "bg-blue-50 border-blue-100"
            } hover:bg-blue-100 hover:border-blue-300 shadow-sm transition duration-200`}
            data-aos="fade-up"
            onClick={() => {
              console.log("Notification clicked:", id);
              handleClickOnNotification(id.toString());
            }}
          >
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full bg-opacity-10 ${color}`}
            >
              <span className={`text-xl ${color}`}>
                {iconMap[icon] || <InfoCircleOutlined />}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-sm  ${
                  isRead ? "text-gray-700" : "text-gray-900 font-medium"
                }`}
              >
                {message.slice(0, 80) + (message.length > 80 ? "..." : "")}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {dayjs(createdAt).format("MMM D, YYYY [at] h:mm A")}
              </p>
            </div>

            {!isRead && (
              <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-3 right-3 animate-pulse"></div>
            )}
          </div>
        ),
      };
    }
  );

  const unreadCount =
    notificationsData?.filter((n: any) => !n.isRead).length || 0;
  const readCount = notificationsData?.filter((n: any) => n.isRead).length || 0;

  return (
    <header className="w-full bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
      {/* System Title */}
      <div className="flex items-center gap-3">
        {/* Logo/Icon */}
        <div className="bg-blue-100 text-main_viridian p-2 rounded-full">
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
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-main_viridian">
            {/* Greeting based on time  */}
            {(() => {
              const hour = new Date().getHours();
              if (hour < 12) return "Good Morning";
              else if (hour < 18) return "Good Afternoon";
              else return "Good Evening";
            })()}
            , {username}!
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
          menu={{
            items: [
              {
                key: "all",
                label: <span>View All</span>,
              },
              {
                key: "mark-all-read",
                label: <span>Mark all as read</span>,
              },
              {
                key: "clear-all",
                label: <span>Clear all notifications</span>,
              },
            ],
          }}
          trigger={["click"]}
          open={isNotificationDropdownOpen}
          placement="bottomRight"
          className="!max-w-[120vw] sm:!max-w-[40%]"
          dropdownRender={() => (
            <div className="bg-white rounded-xl shadow-xl w-80 max-h-[60vh] overflow-y-auto">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="font-semibold text-gray-800">Notifications</div>
                <div className="text-xs text-gray-500 mt-1">
                  ({unreadCount}) Unread • ({readCount}) Read
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {notifications.map((item: any) => (
                  <div key={item.key}>{item.label}</div>
                ))}
              </div>

              {/* <div className="px-4 py-2 text-right border-t border-gray-100">
                <Button
                  size="small"
                  onClick={() => {
                    // Mark all as read logic here
                  }} // Implement this function
                  className="w-full bg-main_viridian border-none hover:!bg-main_olivine transition-colors duration-200 !text-white py-3 !rounded-none !text-xs p-2  font-semibold shadow-md"
                >
                  Mark all as read
                </Button>
              </div> */}
            </div>
          )}
        >
          <Badge
            count={unreadCount > 0 ? unreadCount : 0}
            overflowCount={99}
            color="green"
            className="rounded-full"
            onClick={() => {
              setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
            }}
          >
            <Tooltip title="Notifications">
              <BellOutlined className="text-xl cursor-pointer text-gray-700 hover:text-sky-600 transition duration-200" />
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

    updateClock();
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
