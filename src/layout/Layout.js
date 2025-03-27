import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
