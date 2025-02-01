import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { useAuth } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const News = () => {
  const { title } = useLocalSearchParams();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')
        const response = await fetch("https://unlockpi.vercel.app/api/news", {
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
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#DC2626" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: "white",height:"100%"}}>
      {data
        .filter((item: any) => item.slug === title)
        .map((item: any, index: number) => (
          // <Pressable onPress={()=>router.push(`/(company)/${item.name}`)} >
            <View key={index} style={styles.mainContainer}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {item.title}
              </Text>
              <Text style={{fontSize:18,color:"#737373"}}>{item.description}</Text>
              <Text style={styles.badge}>{item.category}</Text>
              <Text style={{ fontSize: 18, lineHeight: 27 }}>
                {item.content}
              </Text>
            </View>
          // </Pressable>
        ))}
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  mainContainer: {
    // backgroundColor: "#fff",
    gap: 10,
    flexDirection: "column",
    paddingHorizontal: 15,
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
