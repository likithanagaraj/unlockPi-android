import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from "react-native";
import {  Link, useRouter } from "expo-router";
import Navbar from "../../components/home/Navbar";
import TechnologyContainer from "../../components/home/TechnologyContainer";
import MediaContainer from "../../components/home/MediaContainer";
import NewsContainer from "../../components/home/NewsContainer";
import HomeBannerCarousel from "../../components/home/HomeBannerCarousel";
import Home_searchBar from "../../components/home/Home_searchBar";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { theme } from "../../utils/theme";

const Index = () => {
  return (
    
    <ProtectedRoute>
      <ScrollView
      style={{backgroundColor:theme.darkbackground}}
        stickyHeaderHiddenOnScroll={true}
      >
        <Navbar  >UnlockPi</Navbar>
        <View style={styles.mainContainer}>
          <Home_searchBar />
          <HomeBannerCarousel />
          <NewsContainer />
          <TechnologyContainer />
          <MediaContainer />
          
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default Index;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  mainContainer: {
    gap: 20,
    paddingVertical: 25,
    flexDirection: "column",
    paddingHorizontal: 15,
  },
  heroCta: {
    width: "100%",
    height: 242,
    borderRadius: 10,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  loadingimage: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
});
