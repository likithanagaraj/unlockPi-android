import {  StyleSheet, Text, TextInput, View, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";


const Home_searchBar = () => {
  return (
    <Pressable onPress={() => router.push("/(tabs)/search")}>
    <View style={styles.conatiner}>
      {/* Search Bar componets */}
      <TextInput
        placeholder="Find best job for you!"
        
        style={{ fontSize: 15, fontWeight: "semibold" }}
      />

      <Ionicons name="search" size={22} color="black" />
      
    </View>
    </Pressable>
  );
};



const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
export default Home_searchBar;