import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
export default function TabLayout() {
  return (
    <ProtectedRoute>
      <Tabs
      screenOptions={{ tabBarActiveTintColor: "#DC2626", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color }) => (
            <Ionicons name="newspaper" size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarStyle: { display: "none" },
          title: "PI",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle" size={27} color={color} />
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
