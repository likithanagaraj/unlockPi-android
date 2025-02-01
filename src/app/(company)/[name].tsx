import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { useAuth } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompanyDetails = ({ slug }: any) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await fetch(
          `https://unlockpi.vercel.app/api/companies?q=${slug}`, // Fetch jobs by slug
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchData();
  }, [slug]);
  return (
    <View style={{gap:2}}>
      {/* <Text style={styles.box}></Text> */}
     {
      data.map((item: any, index: number) => (
        <View>
          <Image style={styles.box}  source={{uri:item.logo}}  />
        <Text style={{ fontSize: 32, fontWeight: "600", letterSpacing: -0.3 }}>
          {item.name}
        </Text>
       <View className="flex-row items-center w-60 gap-3">
       <Text className="text-[#737373]" style={{fontSize:16,fontWeight:"400"}}>{item.industry}</Text>
       <Text  className="text-[#737373]" style={{fontSize:16,fontWeight:"400"}}>{item.location}</Text>
       </View>
        <Text className="text-[15px]">
          {item.overview}
        </Text>
        </View>
      ))
     }
    </View>
  );
};

const JobContainer = ({name}:any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')
        const response = await fetch("https://unlockpi.vercel.app/api/jobs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setData(result); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#DC2626" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
    {data.map((item: any, index: number) => (
        <View key={index} style={{flexDirection:"row",borderWidth:1,borderColor:"#E0E0E0",padding:15,borderRadius:5,alignItems:"center",}}>
        <View style={{width:200}}>
          <Text  style={{fontSize:18,fontWeight:"bold",}}>{item.title}</Text>
          <Text  style={{fontSize:12,fontWeight:"regular",}} >{item.keywords}</Text>
        </View>
        <View style={{width:30,height:30}} >
           <Image  source={require("../../assets/images/google.png")} />
        </View>
      </View>
    ))}
    </>
   
  );
};

const name = () => {
  const { name } = useLocalSearchParams();

  console.log(name);
  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}
    >
      <View style={styles.mainContainer}>
        <CompanyDetails slug={name} />
        <Text style={{fontSize:20,fontWeight:"bold"}}>All Jobs</Text>
        <JobContainer name = {name}/>
      </View>
    </ScrollView>
  );
};

export default name;

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "white",
    resizeMode: "contain",
    borderColor: "#e5e5e5",
    borderWidth: 1,
    
   
  },
  mainContainer: {
    gap: 20,
    flexDirection: "column",
    paddingHorizontal: 10,
    
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
