import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import Navbar from "../../components/home/Navbar";
import EventsContainer from "../../components/home/EventsContainer";

const index = () => {
  
  


  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
       
        
      }}
      stickyHeaderHiddenOnScroll={true}
    >
      <Navbar >Events</Navbar>
      
      <View style={{paddingHorizontal:15, paddingVertical: 10,}} >
      <Text style={{ fontSize: 30, fontWeight: "bold", }}>
        Events
      </Text>
        <Text style={{ fontSize: 18, fontWeight: "light" }}>
          Hello, Faizan There are 2 events around your location.
        </Text>
      <View style={styles.mainContainer}>
        <EventsContainer />
      </View>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 15,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20
  },
});
