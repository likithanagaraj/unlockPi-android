import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, saveToken, removeToken } from "../utils/authUtils"; // Ensure these utils are correctly implemented

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  // Function to decode JOSH token (assuming it's a JWT-like token)
  const decodeToken = (token) => {
    try {
      const [, payload] = token.split("."); // Assuming it's a JWT format
      const decodedPayload = JSON.parse(atob(payload)); // Decode Base64 payload
      return decodedPayload; // Returns user details from token
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  // Load the token and user details when the component mounts
  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken(); // Fetch the token from storage
      if (token) {
        setAuthToken(token); // Set the auth token
        const userDetails = decodeToken(token); // Decode token to get user details
        setUser(userDetails); // Set user details
      }
    };
    loadToken();
  }, []);

  // Handle login by saving token, decoding it, and setting user details
  const login = async (token) => {
    await saveToken(token); // Save token to storage
    setAuthToken(token); // Set auth token
    const userDetails = decodeToken(token); // Decode and set user info
    setUser(userDetails); // Set user state
  };

  // Handle logout by removing the token and clearing user details
  const logout = async () => {
    await removeToken(); // Remove token from storage
    setAuthToken(null); // Clear auth token state
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
