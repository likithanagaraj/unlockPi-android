import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

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
      <Image source={require("../assets/images/unlockpi.png")} style={styles.logo} />
      <Text style={styles.text}>UnlockPI</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});
