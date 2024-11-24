import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, checked, onCheckedChange }) => {
  return (
    <TouchableOpacity onPress={() => onCheckedChange(!checked)} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
});

