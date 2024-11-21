import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: any) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.container,
        isLoading && styles.disabled,
        containerStyles,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
      
      {isLoading && (
        // <ActivityIndicator animating={isLoading} color={"black"} />
        <ActivityIndicator
          animating={isLoading}
          color="black"
          size="small"
          style={styles.spinner}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DC2626",
    borderRadius: 10, 
    paddingVertical: 10,
    paddingHorizontal: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: "white",
    fontWeight: "bold", 
    fontSize: 18, 
  },
  spinner: {
    marginLeft: 8, // Equivalent to ml-2
  },
});

export default CustomButton;
