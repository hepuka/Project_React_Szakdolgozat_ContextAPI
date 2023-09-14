import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowOnLogin from "./ContextAPI/ShowOnLogin";
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/Reset";
import Employees from "./pages/employees/Employees";
import { auth } from "./firebase/config";
import { useStateValue } from "./ContextAPI/StateProvider";
import { useEffect, useState } from "react";
import Admin from "./pages/admin/Admin";
import Users from "./pages/admin/Users";
import Register from "./pages/auth/Register";
import Products from "./pages/admin/Products";
import AddProducts from "./pages/admin/AddProducts";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import Business from "./pages/admin/Business";
import Contact from "./pages/admin/Contact";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/reset" element={<Reset />}></Route>
          <Route
            path="/admin"
            element={
              <ShowOnLogin>
                <Admin />
              </ShowOnLogin>
            }
          ></Route>
          <Route
            path="/employees"
            element={
              <ShowOnLogin>
                <Employees />
              </ShowOnLogin>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <ShowOnLogin>
                <Users />
              </ShowOnLogin>
            }
          ></Route>
          <Route
            path="/register/:id"
            element={
              <ShowOnLogin>
                <Register />
              </ShowOnLogin>
            }
          ></Route>
          <Route
            path="/add-product/:id"
            element={
              <ShowOnLogin>
                <AddProducts />
              </ShowOnLogin>
            }
          ></Route>
          <Route
            path="/products"
            element={
              <ShowOnLogin>
                <Products />
              </ShowOnLogin>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <ShowOnLogin>
                <Orders />
              </ShowOnLogin>
            }
          ></Route>
          <Route
            path="/order-details/:id"
            element={
              <ShowOnLogin>
                <OrderDetails />
              </ShowOnLogin>
            }
          ></Route>
          <Route
            path="/business"
            element={
              <ShowOnLogin>
                <Business />
              </ShowOnLogin>
            }
          ></Route>
          <Route
            path="/contact"
            element={
              <ShowOnLogin>
                <Contact />
              </ShowOnLogin>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
