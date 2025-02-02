import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../utils/theme";

interface Company {
  id: string;
  name: string;
  logo: string;
  slug: string;
  industry: string;
}

const SkeletonLoader = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonText} />
  </View>
);

const MediaContainer = () => {
  const [company, setCompany] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await fetch(
          "https://unlockpi.vercel.app/api/companies",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setCompany(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter companies based on the 'Social Media' industry
  const socialMediaCompanies = company.filter(
    (item) => item.industry === "Social Media"
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={{color:theme.darktext,fontFamily:"Geist-SemiBold"}} className="h1">Social Media</Text>
      
      {loading ? (
        <FlatList
          horizontal
          data={Array(5).fill({})} // Dummy data for skeleton loaders
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => <SkeletonLoader />}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <FlatList
          horizontal
          data={socialMediaCompanies}
          keyExtractor={(item) => item.id} // Use unique key (id)
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/(company)/${item.name}`)}
            >
              <Carousel name={item.name} image={item.logo} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default MediaContainer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "bold",
  },
  listContent: {
    gap: 25,
    // paddingHorizontal: 10,
  },
  skeletonContainer: {
    width: 150,
    height: 200,
    backgroundColor: theme.cardbg,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: theme.bordercolor,
    borderWidth: 1,
  },
  skeletonImage: {
    width: "95%",
    height: "70%",
    backgroundColor: theme.bordercolor,
    borderRadius: 8,
    marginBottom: 10,
    
  },
  skeletonText: {
    width: "60%",
    height: 15,
    backgroundColor: theme.bordercolor,
    borderRadius: 5,
  },
});
