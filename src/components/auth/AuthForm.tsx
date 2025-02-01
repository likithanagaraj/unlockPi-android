import {
  Button,
  Platform,
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
   
      <View className=" mb-3 ">
        <View className="gap-2"> 
        <Text style={styles.inputText}>{title}</Text>
       <View className="border  border-[#e5e5e5] rounded-md ">
       <TextInput
       className="p-3"
          placeholderTextColor={"#7b7b7b"}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={(title === "Password" || title === "Confirm Password") && !showPassword}
        />
       </View>
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
 
});
