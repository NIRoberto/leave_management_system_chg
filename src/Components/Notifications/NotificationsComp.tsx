import React from "react";
import { List, Avatar, Tag, Typography } from "antd";
import {
  BellOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const mockNotifications = [
  {
    id: 1,
    title: "Leave Approved",
    description: "Your leave request from April 10 to April 12 was approved.",
    date: "2025-04-17",
    type: "success",
  },
  {
    id: 2,
    title: "Pending Leave Request",
    description: "John requested leave from April 22 to April 25.",
    date: "2025-04-16",
    type: "warning",
  },
  {
    id: 3,
    title: "Leave Rejected",
    description: "Your emergency leave request on April 15 was rejected.",
    date: "2025-04-15",
    type: "error",
  },
  {
    id: 4,
    title: "Reminder",
    description: "Please submit your leave plan for May by April 20.",
    date: "2025-04-14",
    type: "info",
  },
];

const getIconByType = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircleOutlined className="text-green-500" />;
    case "warning":
      return <ExclamationCircleOutlined className="text-yellow-500" />;
    case "error":
      return <ExclamationCircleOutlined className="text-red-500" />;
    case "info":
    default:
      return <ClockCircleOutlined className="text-blue-500" />;
  }
};

const getTagColor = (type: string) => {
  switch (type) {
    case "success":
      return "green";
    case "warning":
      return "orange";
    case "error":
      return "red";
    case "info":
    default:
      return "blue";
  }
};

const NotificationsComp = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <Title level={3} className="text-main_dark mb-4">
        Notifications
      </Title>

      <List
        itemLayout="horizontal"
        dataSource={mockNotifications}
        renderItem={(item) => (
          <List.Item className="hover:bg-gray-50 transition-all rounded-md px-2">
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={getIconByType(item.type)}
                  style={{ backgroundColor: "white", border: "1px solid #ccc" }}
                />
              }
              title={
                <div className="flex items-center justify-between">
                  <Text strong>{item.title}</Text>
                  <Tag color={getTagColor(item.type)}>
                    {item.type.toUpperCase()}
                  </Tag>
                </div>
              }
              description={
                <div>
                  <Text>{item.description}</Text>
                  <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationsComp;
