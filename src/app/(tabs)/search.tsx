import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import InfoBox from "../../components/home/InfoBox";
import Navbar from "../../components/home/Navbar";
import SearchBar from "../../components/home/SearchBar";
import { ProtectedRoute } from "../../components/ProtectedRoute";



const index = () => {
  return (
    <ProtectedRoute>
      <ScrollView style={{ height: "100%" }} stickyHeaderHiddenOnScroll={true}>
      <Navbar>Search</Navbar>
      <View style={styles.mainContainer}>
        <SearchBar />
      </View>
    </ScrollView>
    </ProtectedRoute>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 25,
    flexDirection: "column",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: "100%",
    gap:15
  },
  
});
