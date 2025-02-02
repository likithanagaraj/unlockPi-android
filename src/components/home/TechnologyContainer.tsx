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

const TechnologyContainer = () => {
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
        console.log(result)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter the companies for only the "Technology" industry
  const technologyCompanies = company.filter(
    (item) => item.industry === "Technology"
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={{color:theme.darktext, fontFamily:"Geist-SemiBold" }} className="h1">Technology</Text>
      
      {loading ? (
        // Render skeleton loader while data is being fetched
        <FlatList
          horizontal
          data={Array(5).fill({})} // Dummy array to render skeletons
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => <SkeletonLoader />}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <FlatList
          horizontal
          data={technologyCompanies} // Pass the filtered data directly
          keyExtractor={(item) => item.id} // Use the unique ID for key extraction
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/(company)/${item.slug}`)}
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

export default TechnologyContainer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: theme.bordercolor,
  },
  header: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "bold",
  },
  listContent: {
    // paddingHorizontal: 10,
    gap: 25,
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
    width: "100%",
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
