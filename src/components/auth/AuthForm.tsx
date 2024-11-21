import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const AuthForm = ({
  title,
  value,
  otherStyles,
  handleChangeText,
  placeholder,
  ...props
}: any) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{title}</Text>
        <TextInput
          placeholderTextColor={"#7b7b7b"}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          style={styles.inputbox}
          secureTextEntry={(title === "Password" || title === "Confirm Password") && !showPassword}
        />
    
        
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  formContainer: {},
  inputText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    marginBottom: 10,
    justifyContent: "center",
  },
  inputbox: {
    paddingHorizontal: 10,
    fontWeight: "500",
    borderWidth: 0.2,
    width: 250,
    borderRadius: 5,
  },
});
