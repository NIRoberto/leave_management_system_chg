import React from "react";
import {
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

// Dashboard data
const stats = [
  {
    title: "Total Users",
    count: 120,
    icon: <UserOutlined />,
    color: "#e03616",
  },
  {
    title: "Leave Requests",
    count: 45,
    icon: <FileTextOutlined />,
    color: "#17337C",
  },
  {
    title: "Pending Approvals",
    count: 8,
    icon: <ClockCircleOutlined />,
    color: "#FFAA2C",
  },
  {
    title: "New Notifications",
    count: 12,
    icon: <BellOutlined />,
    color: "#13B156",
  },
];

const recentActivities = [
  { title: "John Doe applied for leave", time: "2 hours ago" },
  { title: "Jane Smith's leave request approved", time: "1 day ago" },
  { title: "Mike Johnson updated profile", time: "3 days ago" },
  { title: "Leave policy updated", time: "5 days ago" },
];

const quickLinks = [
  { title: "Manage Leave", link: "/leave" },
  { title: "User Management", link: "/manage-users" },
  { title: "Reports", link: "/reports" },
  { title: "Settings", link: "/settings" },
];

// Mock data for chart
const chartData = [
  { date: "2024-07-01", value: 5 },
  { date: "2024-07-02", value: 10 },
  { date: "2024-07-03", value: 8 },
  { date: "2024-07-04", value: 15 },
  { date: "2024-07-05", value: 12 },
  { date: "2024-07-06", value: 18 },
  { date: "2024-07-07", value: 14 },
];

const DashboardOverview = () => {
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
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-main_dark mb-8">
        Dashboard Overview
      </h1>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
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
          {recentActivities.map((activity, index) => (
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
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-main_dark mb-4">
          Quick Links
        </h2>
        <ul className="space-y-3">
          {quickLinks.map((link, index) => (
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
      </div>

      {/* Activity Trends with AntD Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-main_dark mb-4">
          Activity Trends
        </h2>
        {/* <Line {...config} /> */}
      </div>
    </div>
  );
};

export default DashboardOverview;
