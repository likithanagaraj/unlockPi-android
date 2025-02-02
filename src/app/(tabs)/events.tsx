import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import Navbar from "../../components/home/Navbar";
import EventsContainer from "../../components/home/EventsContainer";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useAuth } from "../../context/authContext";
import { theme } from "../../utils/theme";

const index = () => {
  const {user} = useAuth()
  return (
    <ProtectedRoute>
      <ScrollView
        style={{
          backgroundColor: theme.darkbackground,
        }}
        stickyHeaderHiddenOnScroll={true}
      >
        <Navbar>Events</Navbar>

        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={{ fontSize: 25 ,color:theme.darktext,fontFamily:"Geist-SemiBold"}}>Events</Text>
          <Text  style={{ fontSize: 16,fontFamily:"Geist-Light",color:theme.lighttext }}>
            Hello, {user.username} There are 2 events around your location.
          </Text>
          <View style={styles.mainContainer}>
            <EventsContainer />
          </View>
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    gap: 15,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
});
