import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Notiflix from "notiflix";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const categories = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Manager" },
  { id: 3, name: "Alap" },
];

const initialSate = {
  name: "",
  email: "",
  tax: "",
  pin: "",
  role: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const registerUser = (e) => {
    e.preventDefault();

    if (user.password !== user.passwordConfirm) {
      Notiflix.Notify.failure("Hibás bejelentkezési adat!");
    }

    try {
      createUserWithEmailAndPassword(auth, user.email, user.password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
        }
      );

      addDoc(collection(db, "users"), {
        name: user.name,
        email: user.email,
        bdate: user.bdate,
        bplace: user.bplace,
        password: user.password,
        tax: user.tax,
        pin: user.pin,
        role: user.role,
        createdAt: Timestamp.now().toDate(),
      });

      setUser({ ...initialSate });

      Notiflix.Notify.success("Sikeres felhasználó rögzítés!");
      navigate("/users");
    } catch (error) {
      Notiflix.Notify.failure(error.message);
    }
  };

  return (
    <Layout>
      <div className="register">
        <h1>Új felhasználó regisztrálása</h1>
        <form onSubmit={registerUser}>
          <label>Felhasználó neve</label>
          <input
            type="text"
            required
            name="name"
            value={user.name}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Születési idő</label>
          <input
            type="date"
            required
            name="bdate"
            value={user.bdate}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Születési hely</label>
          <input
            type="text"
            required
            name="bplace"
            value={user.bplace}
            onChange={(e) => handleInputChange(e)}
          />
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={user.email}
            required
            onChange={(e) => handleInputChange(e)}
          />

          <label>Jelszó</label>
          <input
            type="password"
            name="password"
            minLength={8}
            value={user.password}
            required
            onChange={(e) => handleInputChange(e)}
          />

          <label>Adja meg újra a jelszót</label>
          <input
            type="password"
            name="passwordConfirm"
            value={user.passwordConfirm}
            required
            minLength={8}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Jogosultság</label>
          <select
            required
            name="role"
            value={user.role}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- Válassz jogosultságot --
            </option>
            {categories.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <label>Felhasználó adószáma</label>
          <input
            type="text"
            required
            minLength={8}
            maxLength={8}
            name="tax"
            value={user.tax}
            onChange={(e) => handleInputChange(e)}
          />
          <label>PIN kód</label>
          <input
            type="text"
            required
            minLength={4}
            maxLength={4}
            name="pin"
            value={user.pin}
            onChange={(e) => handleInputChange(e)}
          />

          <button type="submit" className="login__signInButton">
            Regisztráció
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
