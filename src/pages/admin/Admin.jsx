import React from "react";
import "./Admin.scss";

import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

const Admin = () => {
  return (
    <>
      <div className="admin">
        <div className="admin__content">
          <img
            src="https://freesvg.org/img/1667812423coffee-shop-logo-concept.png"
            alt="coffe_logo"
          />
          <h1>Üdvözöljük</h1>
          <h2>KunPao's Coffee POS</h2>
        </div>
        <Footer />
        <Sidebar />
      </div>
    </>
  );
};

export default Admin;
