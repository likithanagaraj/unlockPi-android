import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAuth } from "../../context/authContext";
import { Avatar } from "react-native-paper";
import { theme } from "../../utils/theme";

const Navbar = ({ children }: any) => {
  const { user } = useAuth();

  const initials = user.email.split("@")[0].slice(0, 2).toUpperCase();
  // console.log(initials);
  return (
    <Pressable onPress={() => router.push("/(tabs)/profile")}>
      <View style={styles.container} className="py-2">
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => router.push(`/(tabs)`)}>
            <Image
              source={require("../../assets/images/unlockpi.png")}
              style={styles.logo}
            />
          </TouchableOpacity>

          <View>
            <Text style={{fontFamily:"Geist-Bold",fontSize:18,color:theme.darktext}}>{children}</Text>
            {/* <Text style={styles.subText}>Kormangala</Text> */}
          </View>
        </View>
        <Avatar.Text
        labelStyle={{fontFamily:"Geist-SemiBold"}}
        color="black"
          style={{ backgroundColor: "#fff", borderColor: "black" ,borderWidth:1.3,}}
          size={34}
          label={initials}
        />
     
        
      </View>
    </Pressable>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // borderBottomColor: theme.bordercolor,
    // paddingBottom: 10,
    paddingHorizontal: 10,
    // borderBottomWidth: 0.5,
    backgroundColor: theme.darkbackground,
    
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 35,
    height: 30,
    resizeMode: "contain",
  },
 
  subText: {
    fontSize: 14,
    color: "gray",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 22.5,
    // backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});
