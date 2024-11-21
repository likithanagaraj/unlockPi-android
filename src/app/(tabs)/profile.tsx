import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/authContext";
import Navbar from "../../components/home/Navbar";


const Profile = ()=>{
  const { user } = useAuth();
  const username = user.email.split("@")[0];
  const userName = username.charAt(0).toUpperCase() + username.slice(1);
  return(
    <View>
      <Ionicons name = "person-circle-sharp" size={100} color="black" style={{alignSelf: "center"}}/>
      <Text style={{textAlign: "center", fontSize: 25, fontWeight: "bold"}}>{userName}</Text>
      <Text style={{textAlign: "center", fontSize: 16, fontWeight: "regular"}}>{user.email}</Text>
      <Text style={{textAlign: "center", fontSize: 16, fontWeight: "500"}}>Your a Premium User🔥</Text>
    </View>
  )
}


const ButtonComponent = ()=>{
  const { logout} = useAuth();
 
    const handleLogout = () => {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => {
              logout(); // Clear token
              router.push('/(auth)/login'); // Redirect to login screen
            },
          },
        ],
        { cancelable: true }
      );
    };
    return(
      <View style={{gap:8}}>
        <Button
         textColor="black"
          mode="contained"
          style={{borderWidth: 1,backgroundColor:"white",borderColor:"black",borderRadius:8}}
          onPress={() => console.log("Pressed")}>Change Password</Button>
        <Button
        textColor="black"
          mode="contained"
          style={{borderWidth: 1,backgroundColor:"white",borderColor:"black",borderRadius:8}}
          onPress={() => console.log("Pressed")}>Setting</Button>
        <Button
          mode="contained"
          textColor="white"
          style={{backgroundColor:"#DC2626",borderRadius:8}}
          onPress={() => handleLogout()}>Logout</Button>
      </View>
    )
}


const index = () => {
  return (
    <ScrollView  stickyHeaderHiddenOnScroll={true}>
      <Navbar >Profile</Navbar>
     <View style={styles.mainContainer} >
     <View style={{gap:30}}>
        
        <Profile/>
        <ButtonComponent/>
      </View>
     </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

});
