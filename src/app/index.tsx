import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { theme } from "../utils/theme";

const Index = () => {
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("authToken"); // Replace with your storage key
      if (token) {
        router.replace("/(tabs)"); // Navigate to the home page if logged in
      } else {
        router.replace("/(auth)/login"); // Navigate to login if not authenticated
      }
    };

    const timer = setTimeout(() => {
      checkAuthStatus();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/splashscreen.png")} style={{width:250,height:250,resizeMode:"contain"}} />
      {/* <Text style={styles.text}>UnlockPI</Text> */}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.darkbackground,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: theme.darktext,
    
  },
});
