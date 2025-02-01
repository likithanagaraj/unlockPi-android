import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

const Input = ({ onQueryChange }: any) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text: string) => {
    setInputValue(text);
    onQueryChange(text); // Notify the parent component about input changes
  };

  return (
    <View className="flex-row w-full border gap-3 items-center border-[#e5e5e5] px-3 rounded-[10px]">
      <Ionicons name="search" size={22} color="#737373" />
      <TextInput
        value={inputValue}
        onChangeText={handleInputChange}
        className="text-[16px] text-[#737373] py-3" 
        placeholder="Find best job for you!"
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
