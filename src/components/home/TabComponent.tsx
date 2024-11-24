import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState<"Tab1" | "Tab2" | "Tab3">("Tab1");

  // Render content based on the selected tab
  const renderContent = () => {
    switch (activeTab) {
      case "Tab1":
        return <Text style={styles.contentText}>This is the content of Tab 1</Text>;
      case "Tab2":
        return <Text style={styles.contentText}>This is the content of Tab 2</Text>;
      case "Tab3":
        return <Text style={styles.contentText}>This is the content of Tab 3</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab1" && styles.activeTab]}
          onPress={() => setActiveTab("Tab1")}
        >
          <Text style={[styles.tabText, activeTab === "Tab1" && styles.activeTabText]}>Tab 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab2" && styles.activeTab]}
          onPress={() => setActiveTab("Tab2")}
        >
          <Text style={[styles.tabText, activeTab === "Tab2" && styles.activeTabText]}>Tab 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Tab3" && styles.activeTab]}
          onPress={() => setActiveTab("Tab3")}
        >
          <Text style={[styles.tabText, activeTab === "Tab3" && styles.activeTabText]}>Tab 3</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#DE3333",
  },
  tabText: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#DE3333",
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "400",
  },
});

export default TabComponent;
