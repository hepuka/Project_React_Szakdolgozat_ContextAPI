import React from "react";
import "./Admin.scss";
import { useStateValue } from "../../ContextAPI/StateProvider";

const Admin = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <>
      <div className="admin">
        <div className="admin__content">
          <h1>Üdvözöljük</h1>
          <h2>KunPao's Coffee POS</h2>
        </div>

        <div className="sidebar">
          <div className="sidebar__container">
            <h1>{user.email}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
