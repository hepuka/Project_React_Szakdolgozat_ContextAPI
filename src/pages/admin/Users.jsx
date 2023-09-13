import React from "react";
import Layout from "../../components/Layout";
import "./Users.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useStateValue } from "../../ContextAPI/StateProvider";

const Users = () => {
  const { data } = useFetchCollection("users");
  const [{ user }] = useStateValue();

  const confirmDelete = (id) => {
    Notiflix.Confirm.show(
      "Felhasználó törlése!",
      "Valóban törölni akarja a felhasználót?",
      "Törlés",
      "Mégse",

      function okCb() {
        deleteUser(id);
      },

      function cancelCb() {
        console.log("Törlés elutasítva!");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      Notiflix.Notify.success("Sikeres felhasználótörlés!");
    } catch (error) {
      Notiflix.Notify.failure(error.message);
    }
  };

  return (
    <Layout>
      <div className="users">
        <h1>Regisztrált alkalmazottak</h1>
        <div className="users__cardList">
          {data.map((item) => {
            return (
              <div key={item.id} className="users__card">
                <div className="users__rows">
                  <p>Név: </p> <span>{item.name}</span>
                </div>
                <div className="users__rows">
                  <p>Email: </p> <span>{item.email}</span>
                </div>
                <div className="users__rows">
                  <p>Jogosultság: </p> <span>{item.role}</span>
                </div>
                <div className="users__rows">
                  <p>Adószám: </p> <span>{item.tax}</span>
                </div>
                <div className="users__rows">
                  <p>Státusz: </p>{" "}
                  <span
                    className={
                      item.email === user.email ? "active" : "inactive"
                    }
                  >
                    {item.email === user.email ? "Aktív" : "Inaktív"}
                  </span>
                </div>
                <div className="users__buttons">
                  <Link to={`/add-user/${item.id}`}>
                    <button id="update">Módosít</button>
                  </Link>
                  <button id="delete" onClick={() => confirmDelete(item.id)}>
                    Töröl
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Users;
