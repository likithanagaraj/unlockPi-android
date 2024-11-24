import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, onPress, variant = 'default' }) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'outline' ? styles.outlineButton : styles.defaultButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, variant === 'outline' ? styles.outlineButtonText : styles.defaultButtonText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultButton: {
    backgroundColor: '#007AFF',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  defaultButtonText: {
    color: '#FFFFFF',
  },
  outlineButtonText: {
    color: '#007AFF',
  },
});

