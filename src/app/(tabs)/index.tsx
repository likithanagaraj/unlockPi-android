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
import { Link, router, useRouter } from "expo-router";
import Navbar from "../../components/home/Navbar";
import SearchBar from "../../components/home/SearchBar";
import TechnologyContainer from "../../components/home/TechnologyContainer";
import MediaContainer from "../../components/home/MediaContainer";
import NewsContainer from "../../components/home/NewsContainer";

const Hero = () => {
  return (
    <View style={styles.heroCta}>
      <Image
        style={styles.heroImage}
        source={require("../../assets/images/heroCta.png")}
      />
    </View>
  );
};

const Index = () => {
  const router = useRouter();
  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      stickyHeaderHiddenOnScroll={true}
    >
      <Navbar>Home</Navbar>
      <View style={styles.mainContainer}>
        <Pressable onPress={() => router.push("/(tabs)/search")}>
          <SearchBar />
        </Pressable>

        <Hero />
        <Text className="bg-black">Hi</Text>
        <TechnologyContainer />
        <MediaContainer />
        <NewsContainer />
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
});
