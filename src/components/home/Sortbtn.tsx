// import React, { useState } from "react";
// import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import Checkbox from "expo-checkbox";

// type SelectedItems = {
//   City: string[];
//   Industry: string[];
//   Technology: string[];
//   Speciality: string[];
//   CompanySize: string[];
// };

// const Sortbtn = ({ onSubmitFilters }: { onSubmitFilters: (filters: SelectedItems) => void }) => {
//   const [isDialogVisible, setDialogVisible] = useState(false);
//   const [activeTab, setActiveTab] = useState<"City" | "Industry" | "Technology" | "Speciality" | "CompanySize">("City");
//   const [selectedItems, setSelectedItems] = useState<SelectedItems>({
//     City: [],
//     Industry: [],
//     Technology: [],
//     Speciality: [],
//     CompanySize: [],
//   });

//   const toggleDialog = () => {
//     setDialogVisible(!isDialogVisible);
//   };

//   const city = [
//     { id: "1", title: "Delhi" },
//     { id: "2", title: "Bangalore" },
//     { id: "3", title: "Mangalore" },
//     { id: "4", title: "Noida" },
//     { id: "5", title: "Hyderabad" },
//     { id: "6", title: "Mumbai" },
//     { id: "7", title: "Pune" },
//     { id: "8", title: "Punjab" },
//   ];
//   const industry = [
//     { id: "1", title: "IT" },
//     { id: "2", title: "Healthcare" },
//     { id: "3", title: "Finance" },
//     { id: "4", title: "Automobile" },
//     { id: "5", title: "Education" },
//     { id: "6", title: "Real Estate" },
//     { id: "7", title: "Retail" },
//     { id: "8", title: "Manufacturing" },
//   ];
//   const technology = [
//     { id: "1", title: "AI" },
//     { id: "2", title: "Blockchain" },
//     { id: "3", title: "Cloud" },
//     { id: "4", title: "Cybersecurity" },
//     { id: "5", title: "IoT" },
//   ];
//   const speciality = [
//     { id: "1", title: "Machine Learning" },
//     { id: "2", title: "Data Science" },
//     { id: "3", title: "Software Engineering" },
//     { id: "4", title: "Product Management" },
//   ];
//   const companySize = [
//     { id: "1", title: "Small" },
//     { id: "2", title: "Medium" },
//     { id: "3", title: "Large" },
//   ];

//   const handleCheckboxChange = (tab: keyof SelectedItems, id: string) => {
//     setSelectedItems((prev) => {
//       const currentSelection = prev[tab] || [];
//       if (currentSelection.includes(id)) {
//         return {
//           ...prev,
//           [tab]: currentSelection.filter((item) => item !== id),
//         };
//       }
//       return { ...prev, [tab]: [...currentSelection, id] };
//     });
//   };

//   const handleSubmit = () => {
//     onSubmitFilters(selectedItems);
//     setDialogVisible(false);
//   };

//   const renderContent = () => {
//     let data = [];
//     switch (activeTab) {
//       case "City":
//         data = city;
//         break;
//       case "Industry":
//         data = industry;
//         break;
//       case "Technology":
//         data = technology;
//         break;
//       case "Speciality":
//         data = speciality;
//         break;
//       case "CompanySize":
//         data = companySize;
//         break;
//     }

//     return (
//       <View style={styles.contentWrapper}>
//         {data.map((item) => (
//           <View key={item.id} style={styles.checkboxWrapper}>
//             <Checkbox
//               value={selectedItems[activeTab]?.includes(item.id)}
//               onValueChange={() => handleCheckboxChange(activeTab, item.id)}
//               style={styles.checkbox}
//             />
//             <Text>{item.title}</Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <View>
//       <TouchableOpacity onPress={toggleDialog}>
//         <Text>Sort</Text>
//       </TouchableOpacity>
//       <Modal visible={isDialogVisible} transparent={true}>
//         <View style={styles.modalWrapper}>
//           <View style={styles.modalContent}>
//             <View style={styles.tabsContainer}>
//               <TouchableOpacity onPress={() => setActiveTab("City")}>
//                 <Text style={activeTab === "City" && styles.activeTab}>City</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setActiveTab("Industry")}>
//                 <Text style={activeTab === "Industry" && styles.activeTab}>Industry</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setActiveTab("Technology")}>
//                 <Text style={activeTab === "Technology" && styles.activeTab}>Technology</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setActiveTab("Speciality")}>
//                 <Text style={activeTab === "Speciality" && styles.activeTab}>Speciality</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setActiveTab("CompanySize")}>
//                 <Text style={activeTab === "CompanySize" && styles.activeTab}>Company Size</Text>
//               </TouchableOpacity>
//             </View>
//             {renderContent()}
//             <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
//               <Text style={styles.submitText}>Apply Filters</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={toggleDialog} style={styles.closeButton}>
//               <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalWrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     padding: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//   },
//   tabsContainer: {
//     flexDirection: "row",
//     // backgroundColor: "",
//     // justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: 10,
//     marginBottom: 10,
//   },
//   checkboxWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 5,
//   },
//   checkbox: {
//     marginRight: 10,
//   },
//   contentWrapper: {
//     marginBottom: 20,
//   },
//   activeTab: {
//     fontWeight: "bold",
//     color: "#DE3333",
//   },
//   submitButton: {
//     backgroundColor: "#DE3333",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   submitText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//   },
//   closeText: {
//     color: "#DE3333",
//     textAlign: "center",
//   },
// });

// export default Sortbtn;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Sortbtn = () => {
  return (
    <View>
      <Text>Sortbtn</Text>
    </View>
  )
}

export default Sortbtn

const styles = StyleSheet.create({})