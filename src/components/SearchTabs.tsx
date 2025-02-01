import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const SearchTabs = ({ query }: { query: { title?: string; name?: string; description: string }[] }) => {
  const [activeTab, setActiveTab] = useState("News"); // Active tab state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [results, setResults] = useState<{
    title?: string;
    name?: string;
    description: string;
  }[]>([]); // Fetched results state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Effect to reset results when switching tabs
  useEffect(() => {
    setResults([]); // Clear results when active tab changes
  }, [activeTab]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.log("Please enter a search query.");
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("No token found, please login again.");
        return;
      }

      const endpoint =
        activeTab === "News"
          ? `https://unlockpi.vercel.app/api/news?q=${searchQuery}`
          : `https://unlockpi.vercel.app/api/companies?q=${searchQuery}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setResults(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder={`Search in ${activeTab}`}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearch} // Trigger search on "Enter"
      />

      {/* Tab Slider */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "News" && styles.activeTab]}
          onPress={() => setActiveTab("News")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "News" ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Company" && styles.activeTab]}
          onPress={() => setActiveTab("Company")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Company" ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            Company
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results Section */}
      <ScrollView style={styles.resultsContainer}>
        {query.length > 0 ? (
          // Displaying pre-existing `query` results if available
          query.map((item, index) => (
            <View key={index} style={styles.resultItem}>
              <Text style={styles.resultTitle}>{item.title || item.name}</Text>
              <Text style={styles.resultDescription}>{item.description}</Text>
            </View>
          ))
        ) : isLoading ? (
          // Show loading spinner if the search is in progress
          <ActivityIndicator size="large" color="#007BFF" />
        ) : results.length > 0 ? (
          // Displaying search results if available
          results.map((item, index) => (
            <View key={index} style={styles.resultItem}>
              <Text style={styles.resultTitle}>{item.title || item.name}</Text>
              <Text style={styles.resultDescription}>{item.description}</Text>
            </View>
          ))
        ) : (
          // Show message when no results are found
          <Text style={styles.noResults}>
            {searchQuery ? "No results found." : "Please enter a search query."}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "red",
  },
  tabText: {
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  inactiveTabText: {
    color: "#000",
  },
  resultsContainer: {
    marginTop: 10,
  },
  resultItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultDescription: {
    fontSize: 14,
    color: "#666",
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#aaa",
  },
});

export default SearchTabs;
