import { useStateValue } from "./StateProvider";

export const OnlyAdmin = ({ children }) => {
  const [{ userRole }] = useStateValue();

  if (userRole === "Admin" || userRole === "Manager") {
    return children;
  }

  return null;
};

export const OnlyEmployee = ({ children }) => {
  const [{ userRole }] = useStateValue();

  if (userRole === "Alap") {
    return children;
  }

  return null;
};
