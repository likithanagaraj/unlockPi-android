import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Carousel from "./Carousel";
import { router } from "expo-router";

const TechnologyContainer = () => {
  
  const [company, setcompany] = useState([
    {
      id:1,
      name: "Google",
      image: require("../../assets/images/googlelogo.png"),
    },
    {
      id:2,
      name: "Apple",
      image: require("../../assets/images/apple_logo.jpg"),
    },
    {
      id:3,
      name: "Microsoft",
      image: require("../../assets/images/microsoft_logo.jpg"),
    },
    {
      id:4,
      name: "Amazon",
      image: require("../../assets/images/apple_logo.jpg"),
    },
    {id:5,
      name: "Tesla",
      image: require("../../assets/images/apple_logo.jpg"),
    },
  ]);

  return (
    <View style={styles.maincontainer}>
      <Text style={styles.header}>Technology</Text>
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

export default TechnologyContainer;

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
