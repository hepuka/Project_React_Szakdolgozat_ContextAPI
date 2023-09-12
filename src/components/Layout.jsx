import React from "react";
import "./Layout.scss";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout">
        <div className="layout__content">{children}</div>
        <Footer />
        <Sidebar />
      </div>
    </>
  );
};

export default Layout;
