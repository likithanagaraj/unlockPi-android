import React, { createContext, useState, useEffect } from "react";
import { getToken, saveToken, removeToken } from "../utils/authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  // Function to decode JOSH token
  const decodeToken = (token) => {
    try {
      const [, payload] = token.split("."); // Assuming it's a JWT-like format
      const decodedPayload = JSON.parse(atob(payload)); // Decode Base64 payload
      return decodedPayload; // Returns user details
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      if (token) {
        setAuthToken(token);
        const userDetails = decodeToken(token); // Decode user info from the token
        // console.log("User details:", userDetails);
        setUser(userDetails); // Set user state
      }
    };

    loadToken();
  }, []);

  const login = async (token) => {
    await saveToken(token);
    setAuthToken(token);
    const userDetails = decodeToken(token); // Decode and set user info
    setUser(userDetails);
  };

  const logout = async () => {
    await removeToken();
    setAuthToken(null);
    setUser(null); // Clear user details
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
