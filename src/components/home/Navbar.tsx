import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { DarkTheme, Link } from "@react-navigation/native";
import { router } from "expo-router";
import { useAuth } from "../../context/authContext";
import { Avatar } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
// import "../../global.css";
const Navbar = ({children}:any) => {
  const {user} = useAuth()

  const initials = user.email.split("@")[0].slice(0, 2).toUpperCase();
  console.log(initials)
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => router.push(`/(tabs)`)}>
          <Image
            source={require("../../assets/images/unlockpi.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.text}>{children}</Text>
          <Text style={styles.subText}>Kormangala</Text>
        </View>
      </View>
      <Avatar.Text style={{backgroundColor:"black",}}   size={38} label={initials} />
      {/* <Text className="text-2xl font-bold bg-black ">{initials}</Text> */}
      {/* <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => router.push(`/(tabs)/profile`)}
      >
        
      </TouchableOpacity> */}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: "#E0E0E0",
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    backgroundColor: "white",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "gray",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 22.5,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  
});
