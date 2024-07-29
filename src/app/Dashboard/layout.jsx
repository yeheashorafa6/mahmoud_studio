import HeaderDashboard from "@/components/DashboardComp/HeaderDashboard/HeaderDashboard";
import Sidebar from "@/components/DashboardComp/Sidebar/Sidebar";
import FooterDashboard from "@/components/DashboardComp/FooterDashboard/FooterDashboard";
import React from "react";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
function layout({ children }) {
  return (
    <>
    {/* <ClerkProvider> */}
        <div className="flex">
          <div className="flex-1 bg-[#182237] h-full">
            <Sidebar />
          </div>
          <div className="flex-[4] p-5">
            <HeaderDashboard />

            <main className="relative ">{children}</main>
          </div>
        </div>
        {/* <FooterDashboard /> */}
      {/* </ClerkProvider> */}
    </>
  );
}

export default layout;
