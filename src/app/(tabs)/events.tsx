import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import Navbar from "../../components/home/Navbar";
import EventsContainer from "../../components/home/EventsContainer";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useAuth } from "../../context/authContext";

const index = () => {
  const {user} = useAuth()
  return (
    <ProtectedRoute>
      <ScrollView
        style={{
          backgroundColor: "#fff",
        }}
        stickyHeaderHiddenOnScroll={true}
      >
        <Navbar>Events</Navbar>

        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Events</Text>
          <Text className="text-gray-600" style={{ fontSize: 18, fontWeight: "normal" }}>
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
