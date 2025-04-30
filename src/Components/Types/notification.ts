export interface NotificationResponse {
  id: number;
  user: User;
  notificationType: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export type NotificationDataResponse = NotificationResponse[];

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  role: Role;
  created_at: string;
  updated_at: string;
  gender: string | null;
  profile_picture_url: string | null;
  phone: string;
  email: string;
  password: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  hibernateLazyInitializer?: object;
}

export interface NotificationType {
  id: number;
  name: string;
  label: string;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  hibernateLazyInitializer?: object;
}

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
