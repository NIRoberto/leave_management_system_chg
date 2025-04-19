import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../ui/NavBar";

const HomeLayout = () => (
  <>
    <DashboardNavbar />
    <main className="p-6">
      <Outlet />
    </main>
  </>
);

export default HomeLayout;
