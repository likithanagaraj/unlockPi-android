// RootLayout.js
import { SplashScreen, Stack } from "expo-router";
import React, { createContext, useContext } from "react";
import { AuthProvider } from "../context/authContext";
import "../../global.css";
import { LogBox, View } from "react-native";
import { theme } from "../utils/theme";
import { useFonts } from 'expo-font';
LogBox.ignoreLogs(["Setting a timer"]);

function RootLayout() {
  let [fontloaded] = useFonts(
    {
      'Geist': require('../assets/fonts/Geist-v1.4.01/ttf/Geist-Regular.ttf'),
      'Geist-Bold': require('../assets/fonts/Geist-v1.4.01/ttf/Geist-Bold.ttf'),
      'Geist-Light': require('../assets/fonts/Geist-v1.4.01/ttf/Geist-Light.ttf'),
      'Geist-Medium': require('../assets/fonts/Geist-v1.4.01/ttf/Geist-Medium.ttf'),
      'Geist-SemiBold': require('../assets/fonts/Geist-v1.4.01/ttf/Geist-SemiBold.ttf'),
      'Geist-ExtraBold': require('../assets/fonts/Geist-v1.4.01/ttf/Geist-ExtraBold.ttf'),
      'Geist-Black': require('../assets/fonts/Geist-v1.4.01/ttf/Geist-Black.ttf'),
      
    }
  )
  if(!fontloaded){
    SplashScreen.hideAsync()
  }
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

// wrap  <AuthProvider> around the <Stack> component
