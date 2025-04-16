import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => (
  <div className="min-h-screen flex">
    <aside className="w-64 bg-blue-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <nav>
        <NavLink to="/dashboard/overview" className="block mb-2">
          Overview
        </NavLink>
        <NavLink to="/dashboard/settings" className="block mb-2">
          Settings
        </NavLink>
      </nav>
    </aside>
    <main className="flex-1 p-6 bg-gray-50">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
