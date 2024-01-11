import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserAuthContextProviderProps {
  children: React.ReactNode;
}

interface UserAuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextProps | undefined>(undefined);

const UserAuthContextProvider: React.FC<UserAuthContextProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = async () => {
    axios.post("/api/v1/users/logout", {}, { withCredentials: true });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) setIsAuthenticated(true);
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthContextProvider };
