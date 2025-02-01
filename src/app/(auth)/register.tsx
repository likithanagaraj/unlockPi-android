import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import apiClient from "../../utils/apiClient";
import { Link, router } from "expo-router";
import AuthForm from "../../components/auth/AuthForm";
import Demo from "../../components/Tabs";
import CustomButton from "../../components/auth/CustomButton";


const register = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
    phone:"",
    confirmPassword:""
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  const submit = async() => {
    console.log(form);
    setisSubmitting(true);
    try {
      const {username,email,password} = form
      const response = await apiClient.post('/register', {username,email,password});
      console.log(response)
      Alert.alert('Registration Successful', 'Please login now');
      router.push('/(auth)/login'); // Redirect to login page
    } catch (error) {
      Alert.alert('Registration Failed', 'An error occured, please try again');
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <ScrollView >
        <View style={styles.container}>
         
          <Text style={styles.text}>Registration</Text>
          <Image
            style={styles.heroimage}
            source={require("../../assets/images/auth-hero.png")}
          />
          <View style={styles.formContainer}>
            <AuthForm
              title="Username"
              placeholder="name"
              value={form.username}
              otherStyles="fontSize:30"
              handleChangeText={(e: string) =>
                setform({
                  ...form,
                  username: e,
                })
              }
            />
            <AuthForm
              title="Email"
              placeholder="example@gmail"
              value={form.email}
              otherStyles="fontSize:30"
              handleChangeText={(e: string) =>
                setform({
                  ...form,
                  email: e,
                })
              }
            />
            <AuthForm
              placeholder="+91 **********"
              title="Phone"
              value={form.phone}
              otherStyles="fontSize:30"
              handleChangeText={(e: string) =>
                setform({
                  ...form,
                  phone: e,
                })
              }
            />
            <Demo/>
            <AuthForm
              placeholder="******"
              title="Password"
              value={form.password}
              otherStyles="fontSize:30"
              handleChangeText={(e: string) =>
                setform({
                  ...form,
                  password: e,
                })
              }
            />
            <AuthForm
              placeholder="******"
              title="Confirm Password"
              value={form.confirmPassword}
              otherStyles="fontSize:30"
              handleChangeText={(e: string) =>
                setform({
                  ...form,
                  confirmPassword: e,
                })
              }
            />
         
           <CustomButton
              title="Register"
              handlePress={submit}
              isLoading={isSubmitting}
            />
           
            <Link href={"/(auth)/login"} style={{ textDecorationLine: "underline", color: "#DC2626",textAlign:"center",marginTop:10 }}>
              <Text>Already have an  account?</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    paddingVertical: 20
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  heroimage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  formContainer:{
    borderWidth:0.3,
    paddingVertical:20,
    paddingHorizontal:15,
    width:310,
    borderRadius:10,
    flexDirection:'column',
    gap:3
  }
});
