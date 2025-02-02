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
import { theme } from "../../utils/theme";

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
        <View className="gap-3"> 
        <Text style={styles.inputText}>{title}</Text>
       <View  style={{borderColor:theme.bordercolor,borderWidth:1,backgroundColor:theme.darkbackground}} className=" rounded-md ">
       <TextInput
      style={{color:theme.darktext}}
       className="p-3"
          placeholderTextColor={theme.lighttext}
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
    fontFamily: "Geist-Medium",
    color:theme.darktext,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    marginBottom: 10,
    justifyContent: "center",
    
  },
 
});
