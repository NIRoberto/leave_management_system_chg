import { ReactElement } from "react";
import AuthLayout from "../Components/Shared/Layout/AuthLayout";
import DashboardLayout from "../Components/Shared/Layout/DashboardLayout";

const Contact = () => <div>Contact</div>;

const MarketingHome = () => (
  <div>
    <h1>Marketing Home</h1>
  </div>
);

const Login = () => <div>Login</div>;

const Register = () => <div>Register</div>;

const EmployeeDashboard = () => <div>Employee Dashboard</div>;

const AdminDashboard = () => <div>Admin Dashboard</div>;

const ApplyLeave = () => <div>Apply Leave</div>;

const LeaveHistory = () => <div>Leave History</div>;

const TeamCalendar = () => <div>Team Calendar</div>;

const Notifications = () => <div>Notifications</div>;

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
      { index: true, element: <EmployeeDashboard /> },
      { path: "leave", element: <ApplyLeave /> },
      { path: "leave/history", element: <LeaveHistory /> },
      { path: "leave/calendar", element: <TeamCalendar /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
  {
    path: "admin",
    layout: DashboardLayout,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "leave-types", element: <ManageLeaveTypes /> },
      { path: "balances", element: <AdjustLeaveBalance /> },
      { path: "calendar", element: <DepartmentCalendar /> },
      { path: "reports", element: <Reports /> },
      { path: "users", element: <ManageUsers /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
