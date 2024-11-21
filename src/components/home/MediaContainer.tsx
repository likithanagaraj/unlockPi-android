import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Carousel from "./Carousel";
import { router } from "expo-router";

const MediaContainer = () => {
  
  const [company, setcompany] = useState([
    {
      id:1,
      name: "Facebook",
      image: require("../../assets/images/facebook_logo.jpg"),
    },
    {
      id:2,
      name: "Twitter",
      image: require("../../assets/images/twitter_logo.jpg"),
    },
    {
      id:3,
      name: "Snapchat",
      image: require("../../assets/images/snapchatlogo.jpg"),
    },
    {
      id:4,
      name: "LinkedIn",
      image: require("../../assets/images/snapchatlogo.jpg"),
    },
    {id:5,
      name: "Instagram",
      image: require("../../assets/images/snapchatlogo.jpg"),
    },
  ]);

  return (
    <View style={styles.maincontainer}>
      <Text className="text-[25px] mb-5" style={styles.header}>Social Media</Text>
      <FlatList
        horizontal
        data={company}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id}    onPress={() => router.push(`/(company)/${item.name}`)}>
            <Carousel name={item.name} image={item.image} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent} // Add padding/margin between items
        showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
      />
    </View>
  );
};

export default MediaContainer;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    marginBottom: 15,
  },
  listContent: {
    gap: 20, 
  },
});
