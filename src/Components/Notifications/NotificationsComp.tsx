import React from "react";
import { List, Avatar, Tag, Typography, Spin, Empty, Alert } from "antd";
import { useAppContext } from "../../Provider/AppProvider";
import dayjs from "dayjs";
import { NotificationResponse } from "../Types/notification";

const { Title, Text } = Typography;

const NotificationsComp = () => {
  const { notificationsData, isLoadingNotifications, isNotificationsError } =
    useAppContext();

  const renderAvatar = (user: NotificationResponse["user"]) => {
    return user.profile_picture_url ? (
      <Avatar src={user.profile_picture_url} />
    ) : (
      <Avatar>
        {user.first_name[0]}
        {user.last_name[0]}
      </Avatar>
    );
  };

  const renderIcon = (icon: string) => {
    return (
      <Avatar
        className="bg-white border border-gray-300"
        icon={<i className={`ri-${icon} text-lg`} />} // Use Remix Icon or your preferred icon set
        size="large"
      />
    );
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <Title level={4} className="!mb-0 text-main_dark">
          Notifications
        </Title>
        <Tag color="green" className="uppercase">
          {notificationsData?.length} Total
        </Tag>
      </div>

      {isLoadingNotifications ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : isNotificationsError ? (
        <Alert type="error" message="Failed to load notifications" showIcon />
      ) : notificationsData?.length === 0 ? (
        <Empty description="No notifications" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={notificationsData}
          className="divide-y divide-gray-100"
          renderItem={(item) => (
            <List.Item
              className={`hover:bg-gray-50 px-2 py-3 rounded-md transition-all ${
                !item.isRead ? "bg-blue-50" : ""
              }`}
            >
              <List.Item.Meta
                avatar={renderIcon(item.notificationType.icon)}
                title={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Text strong className="text-gray-800">
                        {item.notificationType.label}
                      </Text>
                      {!item.isRead && (
                        <Tag color="processing" className="text-xs">
                          New
                        </Tag>
                      )}
                    </div>
                    <Tag color={item.notificationType.color}>
                      {item.notificationType.name}
                    </Tag>
                  </div>
                }
                description={
                  <div>
                    <Text className="text-gray-700">{item.message}</Text>
                    <div className="text-xs text-gray-400 mt-1">
                      {dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default NotificationsComp;
