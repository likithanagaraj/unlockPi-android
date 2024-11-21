import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";

const TreadingNews = () => {
  const [data, setdata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://unlockpi.vercel.app/api/news");
        const result = await response.json();
        setdata(result);
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
      {data.map((item: any, index: number) => (
        <View
        key={item.id}
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#E0E0E0",
            padding: 8,
            borderRadius: 12,
          }}
        >
          <Image
            source={require("../../assets/images/newsCover.png")}
            style={{ width: 110, height: 80, borderRadius: 10 }}
          />
          <TouchableOpacity onPress={() => router.push(`/(news)/${item.slug}`)}>
            <View>
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
      ))}
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
  text: {
    color: "#3B3232",
    fontSize: 14,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
