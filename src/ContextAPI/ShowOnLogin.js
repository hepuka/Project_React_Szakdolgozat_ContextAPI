import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";

const ShowOnLogin = ({ children }) => {
  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  if (user) {
    return children;
  }
  navigate("/");
};

export default ShowOnLogin;
