import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TreadingNews from "./TreadingNews";
import { router } from "expo-router";
import { theme } from "../../utils/theme";

const NewsContainer = () => {
  return (
    
      <View style={{ flex: 1, gap: 15 }}>
        <Text  className="h1" style={{color:theme.darktext,fontFamily:"Geist-SemiBold"}} >
          Trending news
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
