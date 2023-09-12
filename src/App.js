import Login from "./pages/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reset from "./pages/auth/Reset";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/reset" element={<Reset />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
