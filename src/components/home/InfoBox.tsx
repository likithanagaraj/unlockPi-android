import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const InfoBox = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://unlockpi.vercel.app/api/jobs");
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
    <>
      {data.map((item: any, index: number) => (
        <View
          key={index}
          style={{
            flex: 1,
            flexDirection: "column",
            borderColor: "#e5e5e5",
            borderWidth: 1,
            width: 360,
            padding: 18,
            gap: 5,
            borderRadius: 10,
            marginBottom: 10, 
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "500" }}>{item.title}</Text>
          <View style={{ flex: 1, flexDirection: "column", gap: 15 }}>
            <Text style={{ fontSize: 14, color: "#737373" }}>
              {item.description}
            </Text>
            {/* <Text style={{ fontSize: 14, color: "#DC2626",fontWeight:"bold" }}>
              {item.salary}
            </Text> */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
              {/* Split and render keywords */}
              {item.keywords
                .split(", ")
                .map((keyword: string, keyIndex: number) => (
                  <Text key={keyIndex} style={styles.badge}>
                    {keyword.trim()}
                  </Text>
                ))}
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#E8E8E8",
    textAlign: "center",
    paddingHorizontal:8,
    paddingVertical:6,
    borderRadius: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    margin: 2, 

  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
