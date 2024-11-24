import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import Navbar from "../../components/home/Navbar";
import NewsContainer from "../../components/home/NewsContainer";
import NewsCategory from "../../components/home/NewsCategory";
import { ProtectedRoute } from "../../components/ProtectedRoute";

const MainNews = () => {
  return (
    <View>
    <Image
      source={{
        uri: 'https://unlockpi.vercel.app/_next/image?url=https%3A%2F%2Fth-i.thgim.com%2Fpublic%2Fnews%2Fnational%2Fkarnataka%2Fnzehk6%2Farticle66753341.ece%2Falternates%2FLANDSCAPE_1200%2Fimage.jpg&w=3840&q=75',
      }}
      style={{ width: 350, height: 200 }}
    />
    <Text
      style={{
        position: 'absolute',
        top: 123,
        left: 0,
        color: 'white', // Text color
        fontSize: 25,
        fontWeight: '700', // Makes text bold
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adds a semi-transparent background for highlighting
        width: 350,
        padding: 5, // Adds padding around the text
        borderRadius: 5, // Optional: rounds the corners of the background
        // textAlign: 'center',
      }}
    >
      Top Skills Employers are Looking for in 2024
    </Text>
  </View>
  );
};

const index = () => {
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
          {/* <Text className="font-bold text-[30px]  tracking-tighter">News</Text> */}
          <View  style={{ alignItems: "center", gap:50 }}>
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
    backgroundColor: "#E0E0E0",
  },
  newsbox: {
    width: 360,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    gap: 5,
  },
});
