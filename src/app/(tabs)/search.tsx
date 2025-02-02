import { ScrollView, View, Text, Image } from "react-native";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import Navbar from "../../components/home/Navbar";
import Input from "../../components/Input";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sortbtn from "../../components/home/Sortbtn";
import { Link } from "expo-router";
import TechnologyContainer from "../../components/home/TechnologyContainer";
import MediaContainer from "../../components/home/MediaContainer";
import { theme } from "../../utils/theme";
import { Button } from "react-native-paper";

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
      <ScrollView  style={{ height: "100%" ,backgroundColor:theme.darkbackground}} stickyHeaderHiddenOnScroll={true}>
        <Navbar>Companies</Navbar>

        <View className="p-4 gap-5  font-bold">
          <View className="w-16 ">
            {/* <Button
              title="Sort"
              
              color="#dc2626"
              onPress={() => setIsModalVisible(true)}
            /> */}
            <Button labelStyle={{fontFamily:"Geist-Bold"}}  style={{width:80 , height:39,borderRadius:8}} textColor={theme.darktext} buttonColor="#dc2626" icon="sort" mode="contained" onPress={() => setIsModalVisible(true)} >Sort</Button>
            <Sortbtn
              isVisible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              onApply={handleApply}
            />
          </View>
          <Input onQueryChange={fetchJobs} />
          {loading ? (
            <Text style={{color:theme.darktext,fontFamily:"Geist"}}>Loading...</Text>
          ) : (
            <View>
              {(sortedResults.length > 0 ? sortedResults : searchResults).map(
                (item) => (
                  <View style={{backgroundColor:theme.cardbg,borderColor:theme.bordercolor,borderWidth:1}} key={item.id} className="flex-row items-center p-4  mb-5 rounded-md">
                    <Link href={`/(company)/${item.name}`}>
                      <View className="flex-row gap-8 items-center ">
                        <View style={{borderColor:theme.bordercolor,borderWidth:1,}}  className=" w-20 h-20 items-center  justify-center shadow-lg ">
                          {item.logo && (
                            <Image
                              className=""
                              resizeMode="contain"
                              source={{ uri: item.logo }}
                              style={{ width: 50, height: 50 }}
                            />
                          )}
                        </View>
                        <View className="flex-col gap-[3px]">
                          <Text style={{color:theme.darktext,fontFamily:"Geist-Bold"}} className="text-[19px] font-semibold">
                            {item.name}
                          </Text>
                          <View className="flex-row gap-5 ">
                            <Text style={{color:theme.lighttext,fontFamily:"Geist"}} className="text-[13px]  text-[rgb(24, 27, 24)]">
                              {item.industry}
                            </Text>
                            <Text  style={{color:theme.lighttext,fontFamily:"Geist"}} className="text-[13px] font-light text-[rgb(24, 27, 24)]">
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
