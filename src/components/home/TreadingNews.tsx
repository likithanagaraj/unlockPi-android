import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SkeletonLoader = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
      <View>
        <View style={styles.skeletonText} />
        <View style={[styles.skeletonText, { width: 120 }]} />
        <View style={styles.skeletonBadge} />
      </View>
    </View>
  );
};

const TreadingNews = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("authToken");

        const response = await fetch(
          "https://unlockpi.vercel.app/api/news?take=2",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  return (
    <>
      {loading ? (
        // Display skeleton loaders while data is being fetched
        <>
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        data.map((item: any, index: number) => (
          <View
            key={item.id}
            style={styles.newsContainer}
          >
            {/* <SkeletonLoader/> */}
            <Image
              source={require("../../assets/images/newsCover.png")}
              style={styles.newsImage}
            />
            
            <TouchableOpacity
              onPress={() => router.push(`/(news)/${item.slug}`)}
            >
              <View>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <View style={styles.newsDetails}>
                  <Text style={styles.badge}>{item.category}</Text>
                  <Text>Tue Nov 12 2024</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))
      )}
    </>
  );
};

export default TreadingNews;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#DE3333",
    width: 60,
    textAlign: "center",
    padding: 2,
    borderRadius: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  skeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    padding: 8,
    borderRadius: 12,
    marginBottom: 10,
    gap:5
  },
  skeletonImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  skeletonText: {
    height: 15,
    backgroundColor: "#e0e0e0",
    marginBottom: 5,
    borderRadius: 5,
    width: 200,
  },
  skeletonBadge: {
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    width: 60,
  },
  newsContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    padding: 8,
    borderRadius: 12,
  },
  newsImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
  },
  newsTitle: {
    maxWidth: 200,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "left",
  },
  newsDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
