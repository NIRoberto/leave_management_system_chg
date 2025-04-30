interface User {
  id: number;
  first_name: string;
  last_name: string;
  role: Role;
  email: string;
  phone: string;
  roleId: number | null;
  profile_picture_url: string | null;
  gender: string | null;
  password: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export type AllUsersResponse = User[];

interface LoggedInUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  roleId: number | null;
  role: Role;
  password: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

interface UserByIdResponse {
  user: User;
}

interface UsersResponse {
  users: User[];
}

export interface Role {
  id: number;
  name: string;
  description: string;
  created_at: string; // or Date if you plan to parse it
  updated_at: string; // or Date
}

export type RolesResponse = Role[];

export type { User, LoggedInUser, UserByIdResponse, UsersResponse };
