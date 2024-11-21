import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import Navbar from "../../components/home/Navbar";
import NewsContainer from "../../components/home/NewsContainer";


const MainNews = () => {
  return (
    <View style={styles.newsbox}>
      <Text style={styles.box}></Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Young climate activists take on European countries in a landmark court
        case
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Text>CW</Text>
        <Text>Cameron Williamson</Text>
        <Text>4 min</Text>
      </View>
    </View>
  );
};

const index = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
      }}
      stickyHeaderHiddenOnScroll={true}
    >
      <Navbar >News</Navbar>
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 30, fontWeight: "semibold" }}>News</Text>
        <View style={{ alignItems: "center" }}>
          <MainNews />
        </View>
        <NewsContainer />
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 15,
    flexDirection: "column",
    paddingVertical: 10,
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
