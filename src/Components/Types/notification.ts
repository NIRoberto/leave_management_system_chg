export interface Notification {
  id: number;
  user_id: number;
  notification_type_id: number;
  message: string;
  is_read: "true" | "false";
  created_at: string | null;
}

export type  NotificationResponse =  Notification[];


export interface NotificationType {
  id: number;
  name: string;
  label: string;
  color: string;
  icon: string;
  created_at: string | null;
  updated_at: string | null;
}

export type NotificationTypeResponse = NotificationType[];