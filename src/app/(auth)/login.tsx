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

import { Link, router } from "expo-router";

import { useAuth } from "../../context/authContext";
import apiClient from "../../utils/apiClient";
import AuthForm from "../../components/auth/AuthForm";
import CustomButton from "../../components/auth/CustomButton";

// Define a type for form state
interface FormState {
  email: string;
  password: string;
}

const login = () => {
  const [form, setform] = useState<FormState>({
    email: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  const { login } = useAuth();

  const submit = async () => {
    console.log(form);
    setisSubmitting(true);
    try {
      const response = await apiClient.post("/login", form);
      const token = response.data.token;
      const userDetails = response.data.user; // Adjust according to your API response
      login(token, userDetails);
      router.push("/(tabs)"); // Redirect to protected route (tabs)
    } catch (error) {
      alert("Login Failed");
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Login</Text>
          <Image
            style={styles.heroimage}
            source={require("../../assets/images/auth-hero.png")}
          />
          <View style={styles.formContainer}>
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
            <CustomButton
              title="Login"
              handlePress={submit}
              isLoading={isSubmitting}
            />
            <Link
              href={"/(auth)/register"}
              style={{
                textDecorationLine: "underline",
                color: "#DC2626",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Don't have any account?
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    paddingVertical: 20,
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
  formContainer: {
    borderWidth: 0.3,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: 300,
    borderRadius: 10,
    flexDirection: "column",
    gap: 3,
  },
});
