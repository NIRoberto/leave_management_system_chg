import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-100">
      {/* Left (Brand / Visual) */}
      <div className="hidden md:flex items-center justify-center bg-blue-700 text-white p-10">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold mb-4">Leave Management System</h2>
          <p className="text-lg text-blue-100">
            Manage your team’s leave requests and approvals with ease.
          </p>
        </div>
      </div>

      {/* Right (Form Content) */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl text-black text-6xl shadow-lg p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
