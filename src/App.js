import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowOnLogin from "./ContextAPI/ShowOnLogin";
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/Reset";
import Employees from "./pages/employees/Employees";
import { auth } from "./firebase/config";
import { useStateValue } from "./ContextAPI/StateProvider";
import { useEffect } from "react";
import Admin from "./pages/admin/Admin";
import Users from "./pages/admin/Users";

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
          displayName: null,
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
