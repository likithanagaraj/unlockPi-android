import {  StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  const [query, setquery] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = async (text: string) => {
    setquery(text);
    if (text.trim() === "") {
      setResults([]);
      return;
    }
    try {
      const response = await fetch(`https://unlockpi.vercel.app/api/search?query=${encodeURIComponent(text)}`);
      const data = await response.json();
      setResults(data); 
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <View style={styles.conatiner}>
      <TextInput
        placeholder="Find best job for you!"
        value={query}
        onChangeText={handleSearch}
        style={{ fontSize: 15, fontWeight: "semibold" }}
      />

      <Ionicons name="search" size={22} color="black" />
    </View>
  );
};

export default SearchBar;

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
