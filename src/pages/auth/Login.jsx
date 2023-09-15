import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import Notiflix from "notiflix";
import "./Auth.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useStateValue } from "../../ContextAPI/StateProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const data = useFetchCollection("users");
  const currUserD = data.find((item) => item.email === email);
  const [{ user }, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch({
          type: "SET_CURRUSER",
          currUserData: currUserD,
        });

        console.log(user);
        console.log(currUserD);

        updateProfile(auth.currentUser, {
          displayName:
            currUserD.name + "|" + currUserD.role + "|" + currUserD.pin,
        });

        Notiflix.Notify.success("Sikeres bejelentkezés!");

        currUserD.role === "Admin" || currUserD.role === "Manager"
          ? navigate("/admin")
          : navigate("/employees");
      })
      .catch((error) => {
        Notiflix.Notify.failure(error.message);
      });
  };

  return (
    <div className="login">
      <div className="left">
        <h1>KunPao's Coffee Management</h1>
        <form>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Jelszó</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Belépés
          </button>
          <div className="login__resetSection">
            <Link to="/reset">
              <button>Elfelejtett jelszó</button>
            </Link>
          </div>
        </form>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Login;
