import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Button } from "react-native-paper";

const Events = () => {
  const { title } = useLocalSearchParams();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://unlockpi.vercel.app/api/events");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#DC2626" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.mainContainer}>
      <View >
      {data
        .filter((item: any) => item.slug === title)
        .map((item: any, index: number) => (
          <View key={index} style={styles.mainContainer}>
            <Text style={{ fontSize: 26, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Image
              source={require("../../assets/images/eventCover.jpg")}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 10,
                resizeMode: "cover",
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "semibold",
                letterSpacing: -0.2,
              }}
            >
              {item.location}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "semibold",
                letterSpacing: -0.2,
              }}
            >
              {item.eventDate}
            </Text>
            <Text>{item.description}</Text>
          </View>
        ))}
        <Button
      mode="contained"
      textColor="white"
      style={{backgroundColor:"#DC2626",borderRadius:8}}
      onPress={() => console.log("Pressed")}>Attend</Button>
    </View>
    </ScrollView>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  mainContainer: {
    gap: 10,
    flexDirection: "column",
    paddingHorizontal: 12,
    backgroundColor:"white"
  },
  badge: {
    backgroundColor: "#DE3333",
    width: 80,
    textAlign: "center",
    padding: 5,
    borderRadius: 30,
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
 
});
