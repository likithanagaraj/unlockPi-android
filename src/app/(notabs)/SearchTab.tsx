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
import Input from "../../components/Input";
import SearchTabs from "../../components/SearchTabs";
import Sortbtn from "../../components/home/Sortbtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../utils/theme";

const SearchTab = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortRes, setsortRes] = useState([]);
  const [query, setQuery] = useState<string>("");
  const handleApply = async (selectedTechnologies: string[]) => {
    console.log(Object.entries(selectedTechnologies));
    console.log(selectedTechnologies.join(","));
    setQuery(selectedTechnologies.join(","));
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("No token found, please login again.");
        return;
      }

      const endpoint = `https://unlockpi.vercel.app/api/companies?loation=${query}`;
      console.log(endpoint);
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      // console.log(query);
      
      setsortRes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  return (
    <ProtectedRoute>
      <ScrollView style={{backgroundColor:theme.darkbackground}}  stickyHeaderHiddenOnScroll={true}>
        <Navbar>Search</Navbar>
        <View className=" p-5 h-full ">

          <SearchBar/>
        </View>
       
      </ScrollView>
    </ProtectedRoute>
  );
};

export default SearchTab;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 25,
    flexDirection: "column",
    paddingHorizontal: 15,
    // backgroundColor: "#fff",
    height: "100%",
    gap: 15,
  },
});
