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
import { theme } from "../../utils/theme";

const SkeletonLoader = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
      {/* <SkeletonLoader/> */}
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
          <View key={item.id} style={styles.newsContainer}>
            {/* <SkeletonLoader/> */}
            <Image
              className="border-white/20 border shadow-md"
              source={require("../../assets/images/newsCover.png")}
              style={styles.newsImage}
            />

            <TouchableOpacity
              onPress={() => router.push(`/(news)/${item.slug}`)}
            >
              <View className="flex-1">
                <Text style={styles.newsTitle}>{item.title}</Text>
                <View style={styles.newsDetails}>
                  <Text style={styles.badge}>{item.category}</Text>
                  <Text style={{ color: theme.lighttext, fontFamily: "Geist" }}>
                    Tue Nov 12 2024
                  </Text>
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
    backgroundColor: "#dc2626",
    width: 60,
    textAlign: "center",
    padding: 2,
    borderRadius: 50,
    color: theme.darktext,
    fontSize: 12,
    fontFamily: "Geist-Medium",
  },
  skeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    borderWidth: 1,
    borderColor: theme.bordercolor,
    padding: 12,
    borderRadius: 12,
    backgroundColor: theme.cardbg,
    // marginBottom: 10,
    gap: 5,
  },
  skeletonImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
    backgroundColor: theme.bordercolor,
  },
  skeletonText: {
    height: 15,
    backgroundColor: theme.bordercolor,
    marginBottom: 5,
    borderRadius: 5,
    width: 180,
  },
  skeletonBadge: {
    height: 12,
    backgroundColor: theme.bordercolor,
    borderRadius: 50,
    width: 60,
  },
  newsContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.bordercolor,
    padding: 12,
    borderRadius: 12,
    backgroundColor: theme.cardbg,
  },
  newsImage: {
    width: 110,
    height: 80,
    borderRadius: 10,
  },
  newsTitle: {
    maxWidth: 200,
    fontSize: 15,
    textAlign: "left",
    color: theme.darktext,
    fontFamily: "Geist",
  },
  newsDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
