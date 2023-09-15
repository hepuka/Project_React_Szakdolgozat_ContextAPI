import React from "react";
import "./Placeorder.scss";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { NavLink } from "react-router-dom";

const Placeorder = () => {
  const { id } = useParams();
  const [{ user, userName }] = useStateValue();

  const activeLink = ({ isActive }) => {
    return isActive
      ? "sidebar__button sidebar__button_active"
      : "sidebar__button";
  };

  return (
    <Layout>
      <div className="placeorder">
        <div className="placeorder__card placeorder__tablenumber">
          <h1>{id}. asztal</h1>
          <h2>{userName}</h2>
        </div>

        <div className="placeorder__card placeorder__tablebuttons">
          <div className="sidebar__buttons">
            <NavLink to="/" className={activeLink}>
              Összes
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Ital
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Gyümölcslevek
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Kávé
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Tea
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Sütemények
            </NavLink>

            <NavLink to="/" className={activeLink}>
              Péksütemények
            </NavLink>
          </div>
        </div>
        <div className="placeorder__card placeorder__tableproducts"> </div>
        <div className="placeorder__card placeorder__tableorders"> </div>
        <div className="placeorder__card placeorder__tablepayment"> </div>
      </div>
    </Layout>
  );
};

export default Placeorder;
