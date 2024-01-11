import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext";
import Home from "./Home";
import Login from "./Login";

const Auth = () => {
  // @ts-expect-error UserAuthContext is not undefined
  const { isAuthenticated } = useContext(UserAuthContext);

  return <>{isAuthenticated ? <Home /> : <Login />}</>;
};

export default Auth;
