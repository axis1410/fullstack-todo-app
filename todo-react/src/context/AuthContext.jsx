/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("/api/v1/users/logout")
      .then(() => setIsAuthenticated(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/api/v1/users")
      .then((res) => {
        setUserData(res.data.data);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.error(err);
        if (err.status !== "ERR_BAD_REQUEST") {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogout, userData, setUserData, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
