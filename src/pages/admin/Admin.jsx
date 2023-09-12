import React from "react";
import "./Admin.scss";

import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

const Admin = () => {
  return (
    <>
      <div className="admin">
        <div className="admin__content">
          <div>
            <h1>Üdvözöljük</h1>
            <h2>KunPao's Coffee POS</h2>
          </div>
        </div>
        <Footer />
        <Sidebar />
      </div>
    </>
  );
};

export default Admin;
