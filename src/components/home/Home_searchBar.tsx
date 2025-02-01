import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Home_searchBar = () => {
  return (
    <Pressable onPress={() => router.push("/(notabs)/SearchTab")}>
      <View className="flex-row border gap-3 items-center border-[#e5e5e5] p-3 rounded-[10px]" >
        
        <Ionicons name="search" size={22} color="#737373" />
          <Text className="text-[16px]  text-[#737373]">Find best job for you!</Text>
        
        
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({

});
export default Home_searchBar;
