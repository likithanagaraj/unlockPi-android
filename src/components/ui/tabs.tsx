import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface TabsProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  style?: ViewStyle;
}

export const Tabs: React.FC<TabsProps> = ({ children, value, onValueChange, style }) => {
  return <View style={[styles.tabs, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
});

