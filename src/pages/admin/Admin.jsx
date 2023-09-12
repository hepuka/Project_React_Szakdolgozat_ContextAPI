import React from "react";
import "./Admin.scss";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Admin = () => {
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

  const activeLink = ({ isActive }) =>
    isActive ? "sidebar__button_active" : "";

  return (
    <>
      <div className="admin">
        <div className="admin__content">
          <h1>Üdvözöljük</h1>
          <h2>KunPao's Coffee POS</h2>
        </div>

        <div className="sidebar">
          <div className="sidebar__container">
            <h1>{userName}</h1>

            <div className="sidebar__buttons">
              <Link to="/employees">
                <div className="sidebar__button">Vissza</div>
              </Link>
              <Link to="/employees">
                <div className="sidebar__button">Vissza</div>
              </Link>
              <Link to="/employees">
                <div className="sidebar__button">Vissza</div>
              </Link>
              <Link to="/employees">
                <div className="sidebar__button">Vissza</div>
              </Link>
              <Link to="/employees">
                <div className="sidebar__button">Vissza</div>
              </Link>

              <div onClick={logoutUser} className="sidebar__button">
                Kilépés
              </div>

              {/* isactive beállítani a régi szakdolg.header fájl*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
