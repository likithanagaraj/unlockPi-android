import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuth();
  const router = useRouter();

  if (!authToken) {
    router.replace("/auth/login"); // Redirect unauthorized users
    return null;
  }

  return <>{children}</>;
};
