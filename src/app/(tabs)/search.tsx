import { ScrollView, View, Text, Image, Button } from "react-native";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import Navbar from "../../components/home/Navbar";
import Input from "../../components/Input";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sortbtn from "../../components/home/Sortbtn";
import { Link } from "expo-router";
import TechnologyContainer from "../../components/home/TechnologyContainer";
import MediaContainer from "../../components/home/MediaContainer";

const index = () => {
  const [searchResults, setSearchResults] = useState<
    {
      id: number;
      name: string;
      logo: string;
      industry: string;
      location: string;
    }[]
  >([]);
  const [sortedResults, setSortedResults] = useState<
    {
      id: number;
      name: string;
      logo: string;
      industry: string;
      location: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch companies based on search query
  const fetchJobs = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://unlockpi.vercel.app/api/companies?q=${query}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      setSearchResults(result); // Store search results
      setSortedResults([]); // Clear sort results when searching
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  // /api/companies?q=b&location=mumbai&industry=cloud&companySize=50
  // Handle sorting
  const handleApply = async (selectedCategories: string[]) => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.error("No token found, please login again.");
        return;
      }

      const query = selectedCategories
        .map(({ name, options }: any) => {
          // Encode the category name and options into a query string format
          return options
            .map(
              (option: any) =>
                `${encodeURIComponent(name)}=${encodeURIComponent(option)}`
            )
            .join("&");
        })
        .join("&");
      console.log(query);
      const response = await fetch(
        `https://unlockpi.vercel.app/api/companies?${query}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      // console.log(result);
      setSortedResults(result); // Store sorted results
      setSearchResults([]); // Clear search results when sorting
    } catch (error) {
      console.error("Error fetching sorted data:", error);
      setSortedResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <ScrollView className="bg-white" style={{ height: "100%" }}>
        <Navbar>Companies</Navbar>

        <View className="p-4 gap-5  font-bold">
          <View className="w-20 ">
            <Button
              title="Sort"
              color="#DC2626"
              
              onPress={() => setIsModalVisible(true)}
            />
            <Sortbtn
              isVisible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              onApply={handleApply}
            />
          </View>
          <Input onQueryChange={fetchJobs} />
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <View>
              {(sortedResults.length > 0 ? sortedResults : searchResults).map(
                (item) => (
                  <View key={item.id} className="flex-row items-center p-4  ">
                    <Link href={`/(company)/${item.name}`}>
                      <View className="flex-row gap-8 items-center ">
                        <View className="bg-white border-[1px] border-[#D8D8D8] w-20 h-20 items-center  justify-center shadow-lg">
                          {item.logo && (
                            <Image
                              className=""
                              resizeMode="contain"
                              source={{ uri: item.logo }}
                              style={{ width: 50, height: 50 }}
                            />
                          )}
                        </View>
                        <View className="flex-col gap-[1px]">
                          <Text className="text-[22px] font-semibold">
                            {item.name}
                          </Text>
                          <View className="flex-row gap-5 ">
                            <Text className="text-[16px] font-light text-[rgb(24, 27, 24)]">
                              {item.industry}
                            </Text>
                            <Text className="text-[16px] font-light text-[rgb(24, 27, 24)]">
                              {item.location}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Link>
                  </View>
                )
              )}
            </View>
          )}
          <TechnologyContainer />
          <MediaContainer />
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default index;
