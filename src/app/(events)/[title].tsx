import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../utils/theme";

const Events = () => {
  const { title } = useLocalSearchParams();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();
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
        console.log(result);
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
      <View>
        {data
          .filter((item: any) => item.slug === title)
          .map((item: any, index: number) => (
            <View key={index} style={styles.mainContainer}>
              <Text style={{ fontSize: 24, fontWeight: "bold" ,color:theme.darktext,fontFamily:"Geist-SemiBold"}}>
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
              <View className="flex-row ">
                <View className="flex-row w-52">
                  <Ionicons name="location" size={22} color="#DC2626" />
                  <Text
                    className=""
                    style={{
                      fontSize: 16,
                      fontWeight: "semibold",
                      letterSpacing: -0.2,
                      color:theme.darktext,
                       fontFamily:"Geist"
                    }}
                  >
                    {item.location}
                  </Text>
                </View>
                <View className="flex-row w-60 gap-2">
                  <Ionicons name="calendar-outline" size={20} color="#DC2626" />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "semibold",
                      letterSpacing: -0.2,
                      color:theme.darktext,
                      fontFamily:"Geist"
                    }}
                  >
                    {item.eventDate.split("T")[0].split("-").reverse().join("/")}
                  </Text>
                </View>
              </View>
              <Text style={{color:theme.lighttext,fontFamily:"Geist"}} className="text-[14px] ">{item.description}</Text>
            </View>
          ))}
        <Button
          mode="contained"
          textColor="white"
          labelStyle={{fontFamily:"Geist-Bold"}}
          className="px-2 my-5 text-[18px] font-bold"
          style={{ backgroundColor: "#DC2626", borderRadius: 8, }}
          onPress={() => console.log("Pressed")}
        >
          Attend
        </Button>
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
    backgroundColor: theme.darkbackground,
  },
  mainContainer: {
    gap: 10,
    flexDirection: "column",
    paddingHorizontal: 12,
    backgroundColor: theme.darkbackground,
    // marginBottom: 10,
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
