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
import { theme } from "../../utils/theme";

const Home_searchBar = () => {
  return (
    <Pressable onPress={() => router.push("/(notabs)/SearchTab")}>
      <View style={{borderColor:theme.bordercolor,borderWidth:2,backgroundColor:theme.cardbg}} className="flex-row  gap-3 items-center  p-3 rounded-[10px]" >
        
        <Ionicons name="search" size={18} color={theme.lighttext} />
          <Text style={{color:theme.lighttext,fontFamily:"Geist"}} className="text-[16px]">Find best company for you!</Text>
        
        
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({

});
export default Home_searchBar;
