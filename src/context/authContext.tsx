import axios from "axios";
import React, { createContext } from "react";
import { LoginInputs, User } from "../types";

export type AuthContextType = {
  currentUser: User;
  login: (inputs: LoginInputs) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = React.useState(
    JSON.parse(localStorage.getItem("user") || "")
  );

  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (inputs: LoginInputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
