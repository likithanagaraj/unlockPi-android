import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { theme } from "../../utils/theme";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ title?: string; name?: string; logo?: string; slug?: string; category?: string }[]>([]);
  const [filteredResults, setFilteredResults] = useState<
    { title?: string; name?: string; logo?: string; slug?: string; category?: string }[]
  >([]);
  const [activeTab, setActiveTab] = useState<"News" | "Companies">("News");
  const [filters, setFilters] = useState<any>({});

  const fetchData = async (tab: "News" | "Companies", query: string, filters: any) => {
    const endpoint =
      tab === "News"
        ? "https://unlockpi.vercel.app/api/news"
        : "https://unlockpi.vercel.app/api/companies";

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("No token found, please login again.");
        return;
      }

      // Build the query parameters dynamically
      const params: Record<string, string> = {
        q: query,
        location: filters.City?.join(",") || "",
        industry: filters.Industry?.join(",") || "",
        companySize: filters.CompanySize?.join(",") || "",
      };

      // Remove any empty values from the query parameters
      const searchParams = new URLSearchParams(params);
      searchParams.forEach((value, key) => {
        if (!value) {
          searchParams.delete(key);
        }
      });

      const response = await fetch(`${endpoint}?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.log("Unauthorized, please login again.");
        return;
      }

      const data = await response.json();
      setResults(data); // Set the raw results from the API
      filterResults(data, query, filters); // Apply filtering after fetching data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterResults = (data: any[], query: string, filters: any) => {
    const filtered = data.filter((item: any) =>
      activeTab === "News"
        ? item.title.toLowerCase().includes(query.toLowerCase())
        : item.name.toLowerCase().includes(query.toLowerCase())
    );

    // Apply additional filters (e.g., location, industry) to the already filtered data
    const finalResults = filtered.filter((item) => {
      for (const filterKey in filters) {
        if (
          filters[filterKey]?.length > 0 &&
          !filters[filterKey]?.includes(item[filterKey])
        ) {
          return false;
        }
      }
      return true;
    });

    setFilteredResults(finalResults); // Update the filtered results
  };

  const handleTabChange = (tab: "News" | "Companies") => {
    setActiveTab(tab);
    fetchData(tab, query, filters);
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    filterResults(results, text, filters);
  };

  useEffect(() => {
    fetchData(activeTab, query, filters);
  }, [activeTab, filters]);

  const handleFiltersSubmit = (newFilters: any) => {
    setFilters(newFilters);
    fetchData(activeTab, query, newFilters);
    console.log(activeTab, query, newFilters);
  };

  return (
    <View className="mt-1 " style={{ gap: 5, }}>
      <View style={styles.container}>
        <TextInput
        placeholderTextColor={theme.lighttext}
          placeholder="Find best job for you!"
          value={query}
          onChangeText={handleSearch}
          style={{ fontSize: 15, fontWeight: "semibold" ,fontFamily:"Geist0",color:theme.darktext}}
        />
        <Ionicons name="search" size={20} color={theme.lighttext} />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[activeTab === "News" && styles.activeTab]}
          onPress={() => handleTabChange("News")}
        >
          <Text
            style={[styles.tabText, activeTab === "News" && styles.activeTabText]}
          >
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[activeTab === "Companies" && styles.activeTab]}
          onPress={() => handleTabChange("Companies")}
        >
          <Text
            style={[styles.tabText, activeTab === "Companies" && styles.activeTabText]}
          >
            Companies
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
      key={filteredResults.length}
        data={filteredResults} // Use the same filtered results for both tabs
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View  className="">
            {activeTab === "News" ? (
              // Rendering logic for "News" tab
                <View
                className=""
                  style={{

                    flexDirection: "row",
                    gap: 20,
                    marginBottom: 18,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: theme.bordercolor,
                    padding: 10,
                    borderRadius: 12,
                    backgroundColor:theme.cardbg,
                    
                  }}
                >
                  
                  <Image
                  className="border border-white/20 shadow-md"
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
                          color:theme.darktext,
                          fontFamily:"Geist-Medium",
                          marginBottom: 5,
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
                        <Text style={{color:theme.lighttext,fontFamily:"Geist"}}>Tue Nov 12 2024</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )
             : (
              // Rendering logic for "Companies" tab
              <Link href={`/(company)/${item.title}`}>
               <View className="flex-row gap-10  items-center  ">
                <View style={{backgroundColor:theme.cardbg}} className=" mb-5 w-20 h-20 items-center justify-center shadow-lg">
                {item.logo && <Image resizeMode="contain" source={{ uri: item.logo }} style={{ width: 50, height: 50 }} />}
                </View>
               <Text style={{color:theme.darktext,fontFamily:"Geist-Medium"}} className="text-[18px] font-semibold">{item.name}</Text>
              
               </View>
              </Link>
            )}
          </View>
        )}
        ListEmptyComponent={
          query ? (
            <Text style={styles.noResultsText}>
              No results found for "{query}"
            </Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#DE3333",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    fontFamily:"Geist-Bold"
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: theme.bordercolor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor:theme.cardbg
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    width: "100%",
    // flexDirection:"column",
    // justifyContent:"space-between"
    // backgroundColor: "black",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "500",
   
  },
  noResultsText: {
    marginTop: 20,
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  activeTab: {
    borderBottomColor: "#DE3333",
    borderBottomWidth: 1,
    
  },
  tabText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
   fontFamily:"Geist-SemiBold"
  },
  activeTabText: {
    color: "#DE3333",
    fontFamily:"Geist-SemiBold"
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,

  },
});

export default SearchBar;
