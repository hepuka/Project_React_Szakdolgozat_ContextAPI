import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Notiflix from "notiflix";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userEmail = user.email.substring(0, user.email.indexOf("@"));

        Notiflix.Notify.success("Sikeres bejelentkezés!");

        userEmail === "admin" || userEmail === "manager"
          ? navigate("/admin")
          : navigate("/employees");
      })
      .catch((error) => {
        Notiflix.Notify.failure(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>KunPao's Coffee Management</h1>
        <form>
          <label>E-mail</label>
          <input
            type="text"
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
        </form>

        <div className="login__resetSection">
          <Link to="/reset">
            <button className="login__resetButton">Elfelejtett jelszó</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
