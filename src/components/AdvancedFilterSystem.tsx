// import React, { useState } from "react";
// import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
// import CheckBox from "@react-native-community/checkbox";
// import { useNavigation } from "@react-navigation/native";


// type FilterCategory = "City" | "Industry" | "Company size" | "Speciality" | "Technology";

// const filterCategories: Record<FilterCategory, string[]> = {
//   City: ["Delhi", "Hyderabad", "Bangalore", "Mumbai", "Mangalore", "Pune", "Noida", "Punjab"],
//   Industry: ["Technology", "Social Media", "Semiconductors", "Finance", "Healthcare", "Education", "Retail"],
//   "Company size": ["10", "50", "200", "500", "1000", "5000"],
//   Speciality: ["Search Engine", "Cloud Computing", "Advertising", "Software", "Hardware", "Web Development", "Mobile Apps", "AI/ML", "Data Science", "Cloud Computing"],
//   Technology: ["React", "Node.js", "TS", "C++", "Verilog", "VHDL", "Python", "Java", "AWS"]
// };

// export default function AdvancedFilterSystem() {
//   const navigation = useNavigation();
//   const { data: session } = useSession();

//   const [activeTab, setActiveTab] = useState<FilterCategory>("Industry");
//   const [filters, setFilters] = useState<Record<FilterCategory, string[]>>(
//     Object.fromEntries(
//       Object.keys(filterCategories).map(category => [category, []])
//     ) as Record<FilterCategory, string[]>
//   );
//   const [isOpen, setIsOpen] = useState(true);

//   const handleFilterChange = (category: FilterCategory, item: string) => {
//     setFilters(prev => ({
//       ...prev,
//       [category]: prev[category].includes(item)
//         ? prev[category].filter(i => i !== item)
//         : [...prev[category], item]
//     }));
//   };

//   const handleApply = () => {
//     const queryParams = new URLSearchParams();

//     Object.entries(filters).forEach(([category, items]) => {
//       if (items.length > 0) {
//         queryParams.append(category.toLowerCase().replace(' ', '_'), items.join(','));
//       }
//     });

//     navigation.navigate("Companies", {
//       params: { queryParams: queryParams.toString() }
//     });
//   };

//   const handleClearAll = () => {
//     setFilters(Object.fromEntries(
//       Object.keys(filterCategories).map(category => [category, []])
//     ) as Record<FilterCategory, string[]>);
//   };

//   if (!isOpen) return null;

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.tabsContainer}>
//         {Object.entries(filterCategories).map(([category, items]) => {
//           if (session?.user?.isPremium || category === "City") {
//             return (
//               <View key={category} style={styles.tabContent}>
//                 <Text style={styles.tabTitle}>{category}</Text>
//                 <View style={styles.checkboxContainer}>
//                   {items.map((item) => (
//                     <View key={item} style={styles.checkboxItem}>
//                       <CheckBox
//                         value={filters[category].includes(item)}
//                         onValueChange={() => handleFilterChange(category, item)}
//                       />
//                       <Text>{item}</Text>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             );
//           } else {
//             return (
//               <View key={category} style={styles.tabContent}>
//                 <Text style={styles.tabTitle}>{category} (Pro users only)</Text>
//               </View>
//             );
//           }
//         })}
//       </ScrollView>

//       <View style={styles.footer}>
//         <Button title="Clear all" onPress={handleClearAll} />
//         <Button title="Apply" onPress={handleApply} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: "#fff",
//   },
//   tabsContainer: {
//     marginBottom: 20,
//   },
//   tabContent: {
//     marginBottom: 20,
//   },
//   tabTitle: {
//     fontWeight: "bold",
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   checkboxItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//     marginRight: 15,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingTop: 15,
//   },
// });
