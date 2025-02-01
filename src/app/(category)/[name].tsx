import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TreadingNews from "../../components/home/TreadingNews";

const NewsCategories = () => {
  const [data, setdata] = useState<any[]>([]);
  const { name } = useLocalSearchParams();
  const query = name.toLocaleString();
  console.log(query);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await fetch(
          `https://unlockpi.vercel.app/api/news?category=${
            query === "Explore" ? "" : query
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        const result = await response.json();
        setdata(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <ScrollView
    className=""
      style={{
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: "600", marginBottom: 10 }}>
        {query}
      </Text>
      {data.length > 0 ? (
        data.map((item: any, index: number) => (
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
              marginBottom: 18,
            }}
          >
            <Image
              source={require("../../assets/images/newsCover.png")}
              style={{ width: 110, height: 80, borderRadius: 10 }}
            />
            <TouchableOpacity
              onPress={() => router.push(`/(news)/${item.slug}`)}
            >
              <View className="">
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
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text className="mt-40">No data found</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default NewsCategories;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#DE3333",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});
