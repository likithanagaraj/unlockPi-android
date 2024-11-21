import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import InfoBox from "../../components/home/InfoBox";
import Navbar from "../../components/home/Navbar";
import SearchBar from "../../components/home/SearchBar";



const InfoContainer = ()=>{
  return(
    <View style={styles.infoContainer}>
      <InfoBox />
     
    </View>
  )
}


const index = () => {
  return (
    <ScrollView style={{    height:"100%"}} stickyHeaderHiddenOnScroll={true}>
      <Navbar>Search</Navbar>
      <View style={styles.mainContainer}>
        <SearchBar />
        <InfoContainer/>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 30,
    paddingVertical: 25,
    flexDirection: "column",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    
  },
  infoContainer:{
    flex:1,
    flexDirection:"column",
    gap:20,
    alignItems:"center",
    
  }
});
