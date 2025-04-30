import React from "react";
import {
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { useAppContext } from "../../Provider/AppProvider";

const DashboardOverview = () => {
  const {
    LoggedInUser,
    users,
    leaveRecords,
    notificationsData,
    LeaveRecordsByUserResponse,
  } = useAppContext();

  // Role-based data

  console.log("LoggedInUser", LoggedInUser);

  const role: keyof typeof stats =
    (LoggedInUser?.role?.name?.toLowerCase() as keyof typeof stats) || "staff";

  const stats = {
    staff: [
      {
        title: "Leave Balance",
        count: 12,
        icon: <ClockCircleOutlined />,
        color: "#FFAA2C",
      },
      {
        title: "Pending Requests",
        count:
          LeaveRecordsByUserResponse?.filter(
            (record) => record.leaveStatus?.name === "pending"
          )?.length || 0,

        icon: <FileTextOutlined />,
        color: "#17337C",
      },
    ],
    manager: [
      {
        title: "Team Leave Requests",
        count: leaveRecords?.length || 0,
        icon: <FileTextOutlined />,
        color: "#17337C",
      },
      {
        title: "Pending Approvals",
        count:
          leaveRecords?.filter(
            (record) => record.leaveStatus?.name === "Pending"
          )?.length || 0,
        icon: <ClockCircleOutlined />,
        color: "#FFAA2C",
      },
    ],
    admin: [
      {
        title: "Total Users",
        count: users?.length || 0,
        icon: <UserOutlined />,
        color: "#e03616",
      },
      {
        title: "Leave Requests",
        count: leaveRecords?.length || 0,
        icon: <FileTextOutlined />,
        color: "#17337C",
      },
      {
        title: "Pending Approvals",
        count:
          leaveRecords?.filter(
            (record) => record.leaveStatus?.name === "Pending"
          )?.length || 0,
        icon: <ClockCircleOutlined />,
        color: "#FFAA2C",
      },
      {
        title: "New Notifications",
        count:
          notificationsData?.filter((notification) => !notification.isRead)
            ?.length || 0,
        icon: <BellOutlined />,
        color: "#13B156",
      },
    ],
  };

  const recentActivities = {
    staff: [
      { title: "You applied for leave", time: "2 hours ago" },
      { title: "Your leave request was approved", time: "1 day ago" },
    ],
    manager: [
      { title: "John Doe applied for leave", time: "2 hours ago" },
      { title: "Jane Smith's leave request approved", time: "1 day ago" },
    ],
    admin: [
      { title: "Mike Johnson updated profile", time: "3 days ago" },
      { title: "Leave policy updated", time: "5 days ago" },
    ],
  };

  const quickLinks = {
    staff: [
      { title: "Apply for Leave", link: "/leave/apply" },
      { title: "Leave History", link: "/leave/history" },
    ],
    manager: [
      { title: "Approve Leave Requests", link: "/leave/approvals" },
      { title: "Team Calendar", link: "/calendar" },
    ],
    admin: [
      { title: "Manage Users", link: "/manage-users" },
      { title: "Reports", link: "/reports" },
      { title: "Settings", link: "/settings" },
    ],
  };

  const chartData = [
    { date: "2024-07-01", value: 5 },
    { date: "2024-07-02", value: 10 },
    { date: "2024-07-03", value: 8 },
    { date: "2024-07-04", value: 15 },
    { date: "2024-07-05", value: 12 },
    { date: "2024-07-06", value: 18 },
    { date: "2024-07-07", value: 14 },
  ];

  const config = {
    data: chartData,
    padding: "auto",
    xField: "date",
    yField: "value",
    smooth: true,
    color: "#17337C",
    height: 220,
    xAxis: {
      label: {
        style: {
          fill: "#8C8CA1",
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: "#8C8CA1",
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-md">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-main_dark mb-8">
        Dashboard Overview
      </h1>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats[role]?.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md border-l-4"
            style={{ borderLeftColor: stat.color }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div
                  className="text-xl p-3 rounded-full text-white flex items-center justify-center"
                  style={{ backgroundColor: stat.color }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-sm uppercase">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold">{stat.count}</p>
                </div>
              </div>
              <Tooltip title="More info">
                <SearchOutlined className="text-gray-400 text-lg cursor-pointer hover:text-gray-600" />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-main_dark mb-4">
          Recent Activities
        </h2>
        <ul className="space-y-3">
          {recentActivities[role]?.map((activity, index) => (
            <li
              key={index}
              className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-all"
            >
              <span className="font-medium">{activity.title}</span>{" "}
              <span className="text-gray-400">· {activity.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Links */}
      {/* <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-main_dark mb-4">
          Quick Links
        </h2>
        <ul className="space-y-3">
          {quickLinks[role]?.map((link, index) => (
            <li key={index}>
              <a
                href={link.link}
                className="text-main_dark hover:text-main_orange font-medium text-sm transition-colors duration-200"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Activity Trends with AntD Chart */}
      {/* <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-main_dark mb-4">
          Activity Trends
        </h2>
      </div> */}
    </div>
  );
};

export default DashboardOverview;
