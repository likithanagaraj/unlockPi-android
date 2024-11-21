import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TreadingNews from "./TreadingNews";
import { router } from "expo-router";

const NewsContainer = () => {
  return (
    
      <View style={{ flex: 1, gap: 15 }}>
        <Text style={{ fontSize: 30, fontWeight: "semibold", letterSpacing: -0.2 }}>
          Treading news
        </Text>
        <View style={{ flex: 1, gap: 20 }}>
          
          <TreadingNews />
        </View>
      </View>
   
  );
};

export default NewsContainer;

const styles = StyleSheet.create({
  
});
