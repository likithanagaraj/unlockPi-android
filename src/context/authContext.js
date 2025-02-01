import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, saveToken, removeToken } from "../utils/authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial load

  const decodeToken = (token) => {
    try {
      const [, payload] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      setIsLoading(true);
      const token = await getToken();
      if (token) {
        const userDetails = decodeToken(token);
        setAuthToken(token);
        setUser(userDetails);
      }
      setIsLoading(false); // Loading complete
    };
    loadToken();
  }, []);

  const login = async (token) => {
    await saveToken(token);
    setAuthToken(token);
    const userDetails = decodeToken(token);
    setUser(userDetails);
  };

  const logout = async () => {
    await removeToken();
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
