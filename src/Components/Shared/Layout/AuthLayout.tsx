import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-main_flax">
      {/* Left Panel: Visual & Branding */}
      <div className="hidden md:flex items-center justify-center bg-main_viridian text-white p-12">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-4xl font-extrabold">Leave Management System</h2>
          <p className="text-lg text-main_flax">
            Seamlessly manage team leave requests and approvals.
          </p>
        </div>
      </div>

      {/* Right Panel: Auth Form */}
      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-lg rounded-2xl shadow-x p-8  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
