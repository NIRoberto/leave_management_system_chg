"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useFetchData } from "../Hooks/apiHooks";
import {
  AllUsersResponse,
  LoggedInUser,
  RolesResponse,
  User,
} from "../Components/Types/usersTypes";
import {
  LeaveRecordsResponse,
  LeaveStatusResponse,
  LeaveTypeListResponse,
} from "../Components/Types/leave";
import { NotificationTypeResponse } from "../Components/Types/notification";

interface UserContextType {
  LoggedInUser: LoggedInUser | undefined;
  isLoggedInUserLoading: boolean;
  isLoggedInUserError: boolean;
  loggedInUserError: unknown;
  roles: RolesResponse | undefined;
  isRolesLoading: boolean;
  isRolesError: boolean;
  rolesError: unknown;
  leaveTypes: LeaveTypeListResponse | undefined;
  isLeaveTypesLoading: boolean;
  isLeaveTypesError: boolean;
  users: AllUsersResponse;
  isLoadingUsers: boolean;
  isUsersError: boolean;
  notificationTypes: NotificationTypeResponse;
  isLoadingNotificationTypes: boolean;
  isNotificationTypesError: boolean;
  leaveStatuses: LeaveStatusResponse;
  isLeaveStatusesLoading: boolean;
  isLeaveStatusesError: boolean;
  leaveRecords: LeaveRecordsResponse;
  isLeaveRecordsLoading: boolean;
  isLeaveRecordsError: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const {
    data: LoggedInUser,
    isLoading: isLoggedInUserLoading,
    isError: isLoggedInUserError,
    error: loggedInUserError,
  } = useFetchData<User>("loggedInUser", "auth/me");

  const {
    data: roles,
    isLoading: isRolesLoading,
    isError: isRolesError,
    error: rolesError,
  } = useFetchData<RolesResponse>("roles", "roles");

  const {
    data: leaveTypes,
    isLoading: isLeaveTypesLoading,
    isError: isLeaveTypesError,
    error: leaveTypesError,
  } = useFetchData<LeaveTypeListResponse>("leave/types", "leave/types");

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isUsersError,
  } = useFetchData<AllUsersResponse>("users", "users");

  const {
    data: notificationTypes,
    isLoading: isLoadingNotificationTypes,
    isError: isNotificationTypesError,
  } = useFetchData<NotificationTypeResponse>(
    "notificationTypes",
    "notification/types"
  );

  const {
    data: leaveStatuses,
    isLoading: isLeaveStatusesLoading,
    isError: isLeaveStatusesError,
    error: leaveStatusesError,
  } = useFetchData<LeaveStatusResponse>("leaveStatus", "leave/status");

  const {
    data: leaveRecords,
    isLoading: isLeaveRecordsLoading,
    isError: isLeaveRecordsError,
    error: leaveRecordsError,
  } = useFetchData<LeaveRecordsResponse>("leaveRequests", "leave/request");
  return (
    <UserContext.Provider
      value={
        {
          LoggedInUser,
          isLoggedInUserLoading,
          isLoggedInUserError,
          loggedInUserError,
          roles,
          isRolesLoading,
          isRolesError,
          rolesError,
          leaveTypes,
          isLeaveTypesLoading,
          isLeaveTypesError,
          users,
          isLoadingUsers,
          isUsersError,
          notificationTypes,
          isLoadingNotificationTypes,
          isNotificationTypesError,
          leaveStatuses,
          isLeaveStatusesLoading,
          isLeaveStatusesError,
          leaveRecords,
          isLeaveRecordsLoading,
        } as UserContextType
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAppContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a AppProvider");
  }
  return context;
};

export default AppProvider;
