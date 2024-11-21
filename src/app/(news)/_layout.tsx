import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Appbar } from "react-native-paper";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => {
          return (
            <Appbar.Header >
              <Appbar.BackAction onPress={() => {router.push("/(tabs)")}} />
              <Appbar.Content title="Back" />
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
