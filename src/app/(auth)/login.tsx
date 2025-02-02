import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { useAuth } from "../../context/authContext";
import apiClient from "../../utils/apiClient";
import AuthForm from "../../components/auth/AuthForm";
import CustomButton from "../../components/auth/CustomButton";
import { theme } from "../../utils/theme";

// Define a type for form state
interface FormState {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user } = useAuth();

  // Redirect if the user is already logged in
  useEffect(() => {
    if (user) {
      router.replace("/(tabs)"); // Redirect to main screen if already logged in
    }
  }, [user]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.post("/login", form);
      const token = response.data.token;
      const userDetails = response.data.user; // Adjust based on your API response
      await login(token, userDetails);
      router.replace("/(tabs)"); // Navigate and clear the login page from the stack
    } catch (error) {
      Alert.alert("Login Failed", "Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{  height: "100%",backgroundColor:theme.darkbackground }}>
      <ScrollView >
        <View style={styles.container}>
          <Text style={styles.text}>Login</Text>
          <Image
            style={styles.heroImage}
            source={require("../../assets/images/auth-image.png")}
          />
          <View style={styles.formContainer}>
            <AuthForm
              title="Email"
              placeholder="example@gmail.com"
              value={form.email}
              handleChangeText={(email: string) =>
                setForm({ ...form, email })
              }
            />
            <AuthForm
              placeholder="******"
              title="Password"
              value={form.password}
              handleChangeText={(password: string) =>
                setForm({ ...form, password })
              }
            />
            <CustomButton
              title="Login"
              handlePress={handleSubmit}
              isLoading={isSubmitting}
            />
            <Link
              href={"/(auth)/register"}
              style={styles.registerLink}
            >
              <Text style={{fontFamily: "Geist-Light",}}>Don't have an account? Register</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

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
    color: theme.darktext,
    fontFamily: "Geist-Bold",
  },
  heroImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  formContainer: {
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: 305,
    borderRadius: 10,
    flexDirection: "column",
    gap: 3,
    backgroundColor: theme.cardbg,
    borderColor: theme.bordercolor,
  },
  registerLink: {
    textDecorationLine: "underline",
    color: "#DC2626",
    textAlign: "center",
    marginTop: 10,
  },
});
