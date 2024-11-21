import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const AuthNavbar = () => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/unlockpi.png")} style={styles.logo} />
      <AntDesign name="bars" size={29} color="black" />
    </View>
  );
};

export default AuthNavbar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth:0.2,
    borderBottomColor:"grey",
  },
  logo:{
    width:40,
    height:40
  }
});
