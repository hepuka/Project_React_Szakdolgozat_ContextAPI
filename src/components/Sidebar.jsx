import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import "./Sidebar.scss";

const Sidebar = () => {
  const [{ userName }] = useStateValue();
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
        <h1>Bejentkezve: {userName}</h1>

        <div className="sidebar__buttons">
          <NavLink to="/users" className={activeLink}>
            Felhasználók
          </NavLink>

          <NavLink to="/register/ADD" className={activeLink}>
            Új felhasználó regisztrálása
          </NavLink>

          <NavLink to="/products" className={activeLink}>
            Termékek
          </NavLink>

          <NavLink to="/add-product/ADD" className={activeLink}>
            Új termék hozzáadása
          </NavLink>

          <NavLink to="/orders" className={activeLink}>
            Összes rendelés
          </NavLink>

          <NavLink to="/business" className={activeLink}>
            Üzleti összesítő
          </NavLink>

          <NavLink to="/contact" className={activeLink}>
            Hibabejelentés
          </NavLink>

          <div className="sidebar__buttons">
            {userName === "Admin" ? (
              <NavLink to="/admin" className="sidebar__button">
                Főoldal
              </NavLink>
            ) : (
              <NavLink to="/employees" className="sidebar__button">
                Főoldal
              </NavLink>
            )}

            <div onClick={logoutUser} className="sidebar__button">
              Kilépés
            </div>
          </div>

          {/* isactive beállítani a régi szakdolg.header fájl*/}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
