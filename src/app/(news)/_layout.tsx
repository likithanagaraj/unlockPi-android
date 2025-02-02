import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Appbar } from "react-native-paper";
import { theme } from "../../utils/theme";

const Layout = () => {
  return (
    <Stack
    
      screenOptions={{
        header: (props) => {
          return (
            <Appbar.Header style={{ backgroundColor: theme.cardbg }}>
              <Appbar.BackAction  color={theme.darktext} onPress={() => {router.push("/(tabs)")}} />
              <Appbar.Content  title="Back" color={theme.darktext} />
            </Appbar.Header>
          );
        },
      }}
    >
      
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
