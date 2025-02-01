import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SkeletonLoader = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonTextLarge} />
    <View style={styles.skeletonTextSmall} />
    <View style={styles.skeletonTextSmall} />
  </View>
);

const EventsContainer = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.log("No token found, please login again.");
          return;
        }
        const response = await fetch("https://unlockpi.vercel.app/api/events", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    // Render the skeleton loader while data is being fetched
    return (
      <ScrollView contentContainerStyle={styles.skeletonContainer}>
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
      </ScrollView>
    );
  }

  return (
    <>
      {data.map((item: any, index: number) => (
        <View
          key={index}
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            width: 360,
            borderWidth: 1,
            paddingVertical: 25,
            paddingHorizontal: 18,
            borderColor: "#e5e5e5",
            borderRadius: 20,
            gap: 5,
          }}
        >
          <Image
            source={require("../../assets/images/eventCover.jpg")}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
          <View style={styles.EventsContainer}>
            <Text style={styles.eventTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={"#DC2626"}
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
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Ionicons
                  name="calendar-clear-outline"
                  size={16}
                  color={"#DC2626"}
                />
                <Text
                  style={{
                    letterSpacing: -0.5,
                    fontSize: 15,
                    fontWeight: "semibold",
                  }}
                >
                  {new Date(item.eventDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </View>
            </View>
            <View style={{ gap: 10 }}>
              <Text numberOfLines={3} style={styles.description}>
                {item.description}
              </Text>
              <Button
                icon="arrow-right"
                mode="contained"
                onPress={() => {
                  router.push(`/(events)/${item.slug}`);
                }}
                buttonColor="#DC2626"
                textColor="white"
                style={styles.button}
              >
                Attend
              </Button>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default EventsContainer;

const styles = StyleSheet.create({
  EventsContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 12,
  },
  eventTitle: {
    fontSize: 25,
    fontWeight: "bold",
    minHeight: 40, // Ensures minimum space for two lines
  },
  description: {
    fontSize: 14,
    textAlign: "justify",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 3,
  },
  // Skeleton Styles
  skeletonContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 20,
  },
  skeletonCard: {
    width: 320,
    height: 300,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    padding: 20,
  },
  skeletonImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    backgroundColor: "#cfcfcf",
    marginBottom: 15,
  },
  skeletonTextLarge: {
    width: "80%",
    height: 20,
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 10,
  },
  skeletonTextSmall: {
    width: "60%",
    height: 15,
    borderRadius: 5,
    backgroundColor: "#d0d0d0",
    marginBottom: 5,
  },
});
