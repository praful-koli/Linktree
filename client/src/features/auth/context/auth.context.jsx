import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("user")) || null;
  const savedToken = localStorage.getItem("accessToken") || null;

  const [user, setUser] = useState(savedUser);
  const [accessToken, setAccessToken] = useState(savedToken);

  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};