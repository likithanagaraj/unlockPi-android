// index.js (Home Page)
import { StyleSheet, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <Link href="/(auth)/login">Login</Link>
    
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
