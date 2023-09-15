import React from "react";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import "./Sidebar.scss";
import { OnlyAdmin, OnlyEmployee } from "../ContextAPI/OnlyAdmin";

const Sidebar = () => {
  const [{ user, userName, userRole }] = useStateValue();
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        Notiflix.Notify.success("Sikeres kijelentkezés!");
        navigate("/");
      })
      .catch((error) => {
        Notiflix.Notify.failure(error.message);
      });
  };

  const activeLink = ({ isActive }) => {
    return isActive
      ? "sidebar__button sidebar__button_active"
      : "sidebar__button";
  };

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <h1>Bejelentkezve: {userName}</h1>

        <div className="sidebar__buttons">
          <OnlyAdmin>
            <NavLink to="/users" className={activeLink}>
              Felhasználók
            </NavLink>

            <NavLink to="/register/ADD" className={activeLink}>
              Új felhasználó regisztrálása
            </NavLink>
          </OnlyAdmin>

          <NavLink to="/products" className={activeLink}>
            Termékek
          </NavLink>

          <OnlyAdmin>
            <NavLink to="/add-product/ADD" className={activeLink}>
              Új termék hozzáadása
            </NavLink>
          </OnlyAdmin>

          <NavLink to="/orders" className={activeLink}>
            Összes rendelés
          </NavLink>

          <OnlyAdmin>
            <NavLink to="/business" className={activeLink}>
              Üzleti összesítő
            </NavLink>

            <NavLink to="/contact" className={activeLink}>
              Hibabejelentés
            </NavLink>
          </OnlyAdmin>

          <OnlyEmployee>
            <NavLink to="/tables" className={activeLink}>
              Asztalok
            </NavLink>
          </OnlyEmployee>

          <div className="sidebar__buttons">
            <NavLink to="/main" className="sidebar__button">
              Főoldal
            </NavLink>

            <div onClick={logoutUser} className="sidebar__button">
              Kilépés
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
