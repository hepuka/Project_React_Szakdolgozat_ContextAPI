import React from "react";
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <h2>
        &copy; 2022 - {year}, Created by Zoltan KUN-FAGYAL - All Rights Reserved
      </h2>
    </div>
  );
};

export default Footer;
