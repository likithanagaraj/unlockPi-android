import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { theme } from "../utils/theme";

const Input = ({ onQueryChange }: any) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text: string) => {
    setInputValue(text);
    onQueryChange(text); // Notify the parent component about input changes
  };

  return (
    <View style={{borderColor:theme.bordercolor,borderWidth:1,backgroundColor:theme.cardbg}} className="flex-row w-full  gap-3 items-center px-3 rounded-[10px]">
      <Ionicons name="search" size={22} color={theme.lighttext} />
      <TextInput
      placeholderTextColor={theme.lighttext}
        value={inputValue}
        onChangeText={handleInputChange}
        className="text-[16px]  py-3 " 
        placeholder="Find best job for you!"
        style={{fontFamily:"Geist",color:theme.darktext}}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
