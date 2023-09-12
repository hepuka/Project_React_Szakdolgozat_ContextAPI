import { useStateValue } from "./StateProvider";

const ShowOnLogin = ({ children }) => {
  const [{ user }] = useStateValue();

  if (user) {
    return children;
  }
  return null;
};

export default ShowOnLogin;
