import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};

export default useAuth;
