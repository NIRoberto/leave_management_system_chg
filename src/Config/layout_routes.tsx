import { ReactElement } from "react";
import TeamCalenderComp from "../Components/CalenderView/TeamCalenderComp";
import DashboardOverView from "../Components/OverView/DashboardOverView";
import LeaveManagement from "../Components/LeaveManagement/LeaveManagement";
import NotificationsComp from "../Components/Notifications/NotificationsComp";
import LeaveHistory from "../Components/LeaveManagement/LeaveHistory";
import ProfileUpdateAndView from "../Components/Settings/ProfileUpdateAndView";
import ChangePassword from "../Components/Settings/ChangePassword";
import LeavesApprovalsManagement from "../Components/LeaveManagement/LeavesApprovalsManagement";
import UsersManagement from "../Components/Users/UsersManagement";
import LeaveTypesManagement from "../Components/LeaveManagement/LeaveTypesMagement";
import LeaveBalanceManagement from "../Components/LeaveManagement/LeaveBalance";
import Login from "../Components/Auth/Login";
import AuthLayout from "../Components/Shared/Layout/AuthLayout";
import DashboardLayout from "../Components/Shared/Layout/DashboardLayout";

const Contact = () => <div>Contact</div>;
const MarketingHome = () => (
  <div>
    <h1>Marketing Home</h1>
  </div>
);

const Register = () => <div>Register</div>;
const ManageLeaveTypes = () => <div>Manage Leave Types</div>;
const AdjustLeaveBalance = () => <div>Adjust Leave Balance</div>;
const DepartmentCalendar = () => <div>Department Calendar</div>;
const Reports = () => <div>Reports</div>;
const ManageUsers = () => <div>Manage Users</div>;

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-red-600">404</h1>
    <p className="mt-4 text-lg text-gray-700">Page Not Found</p>
  </div>
);

interface RouteItem {
  path?: string;
  index?: boolean;
  element?: ReactElement;
  layout?: React.ComponentType;
  children?: RouteItem[];
}

export type { RouteItem };

const routes: RouteItem[] = [
  {
    layout: AuthLayout,
    path: "/",
    children: [
      { index: true, element: <MarketingHome /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "dashboard",
    layout: DashboardLayout,
    children: [
      { index: true, path: "overview", element: <DashboardOverView /> },
      { path: "apply-leave", element: <LeaveManagement /> },
      { path: "leave-history", element: <LeaveHistory /> },
      { path: "leave-approval", element: <LeavesApprovalsManagement /> },
      { path: "team-calendar", element: <TeamCalenderComp /> },
      { path: "notifications", element: <NotificationsComp /> },
      { path: "manage-users", element: <UsersManagement /> },
      { path: "manage-leave-types", element: <LeaveTypesManagement /> },
      {
        path: "adjust-leave-balance",
        element: (
          <LeaveBalanceManagement
            leaveType="Annual Leave"
            totalDays={20}
            usedDays={5}
          />
        ),
      },
      { path: "profile", element: <ProfileUpdateAndView /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "admin",
    layout: DashboardLayout,
    children: [
      { index: true, element: <DashboardOverView /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "manage-leave-types", element: <ManageLeaveTypes /> },
      { path: "adjust-leave-balance", element: <AdjustLeaveBalance /> },
      { path: "calendar", element: <DepartmentCalendar /> },
      { path: "reports", element: <Reports /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
