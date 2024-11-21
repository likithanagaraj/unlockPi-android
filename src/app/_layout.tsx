// RootLayout.js
import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../context/authContext";
import "../../global.css";
function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
        <Stack.Screen name="(auth)/register" options={{ title: "Register" }} />
        <Stack.Screen name="(tabs)" options={{ title: "Tabs" }} />
      </Stack>
    </AuthProvider>
  );
}

export default RootLayout;
