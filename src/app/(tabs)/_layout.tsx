import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Image, LogBox, View } from "react-native";
import { theme } from "../../utils/theme";

LogBox.ignoreLogs(["Setting a timer"]);
export default function TabLayout() {
  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#dc2626",
          // tabBarInactiveTintColor: theme.lighttext,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.cardbg,
            borderTopWidth: 1,
            borderColor: theme.darkbackground,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: "News",
            tabBarIcon: ({ color }) => (
              <Ionicons name="newspaper" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            // tabBarStyle: { display: "none" },
            title: "PI",
            tabBarIcon: ({ color }) => (
             <View  style={{position:"absolute",top:-25,backgroundColor:theme.darkbackground,borderRadius:100,padding:10,}}>
               <Image
                source={require("../../assets/images/unlockpi.png")}
                style={{ width: 35, height: 35, resizeMode: "contain" }}
              />
             </View>
              // <Ionicons   name="search" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: "Events",
            tabBarIcon: ({ color }) => (
              <Ionicons name="people" size={23} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle" size={25} color={color} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="company/[name]"
          options={{
            headerShown: false,
          }}
        /> */}
      </Tabs>
    </ProtectedRoute>
  );
}

// Wrap </ProtectedRoute>
