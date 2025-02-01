import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import Navbar from "../../components/home/Navbar";
import NewsCategory from "../../components/home/NewsCategory";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import Input from "../../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";


const MainNews = () => {
  return (
    <ScrollView horizontal>
    <View className="">
     
      <View className="flex-row gap-5">
      {
        [1,2,3,4,5].map((item)=>(
          <Image
          key={item}
        className="rounded-md"
        source={{
          uri: "https://unlockpi.vercel.app/_next/image?url=https%3A%2F%2Fth-i.thgim.com%2Fpublic%2Fnews%2Fnational%2Fkarnataka%2Fnzehk6%2Farticle66753341.ece%2Falternates%2FLANDSCAPE_1200%2Fimage.jpg&w=3840&q=75",
        }}
        style={{ width: 328, height: 200 }}
      />
        ))
      }
      
      </View>
      <Text
        className="w-[325px] shadow-2xl  "
        style={{
          position: "absolute",
          top: 123,
          left: 0,
          color: "white", // Text color
          fontSize: 25,
          fontWeight: "700", // Makes text bold
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Adds a semi-transparent background for highlighting
          padding: 5, // Adds padding around the text
          borderRadius: 5, // Optional: rounds the corners of the background
          // textAlign: 'center',
        }}
      >
        Top Skills Employers are Looking for in 2024
      </Text>
    </View>
      </ScrollView>

  );
};

const index = () => {
  const [searchResults, setSearchResults] = useState<
    { id: number; name: string; logo: string; industry: string; location: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const fetchnews = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://unlockpi.vercel.app/api/news?q=${query}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      setSearchResults(result); // Store search results
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProtectedRoute>
      <ScrollView
        style={{
          backgroundColor: "#fff",
        }}
        stickyHeaderHiddenOnScroll={true}
      >
        <Navbar>News</Navbar>
       
        <View style={styles.mainContainer}>
        <Input onQueryChange={fetchnews} />
        {searchResults.map((item: any, index: number) => (
        <View
        key={item.id}
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#e5e5e5",
            padding: 8,
            borderRadius: 12,
          }}
        >
          <Image
            source={require("../../assets/images/newsCover.png")}
            style={{ width: 110, height: 80, borderRadius: 10 }}
          />
          <TouchableOpacity onPress={() => router.push(`/(news)/${item.slug}`)}>
            <View>
              <Text
                style={{
                  maxWidth: 200,
                  fontSize: 15,
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                {item.title}
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text style={styles.badge}>{item.category}</Text>
                <Text>Tue Nov 12 2024</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
          {/* <Text className="font-bold text-[30px]  tracking-tighter">News</Text> */}
          <View style={{ alignItems: "center", gap: 40 }}>
           
            <MainNews />
            <NewsCategory />
          </View>

          {/* <NewsContainer /> */}
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 15,
    flexDirection: "column",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  box: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#e5e5e5",
  },
  newsbox: {
    width: 360,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    gap: 5,
  },
  badge: {
    backgroundColor: "#DE3333",
    color: "white", 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "600",
  },
});
