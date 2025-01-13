import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full shadow-sm fixed top-0 left-0 bg-white z-50">
        <Header />
      </div>
      <div className="bg-slate-50 w-full flex pt-[72px] h-full">
        <div className="basis-1/5 h-full">
          <Sidebar />
        </div>
        <div className="p-5 basis-4/5 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
