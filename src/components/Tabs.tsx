import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../utils/theme';

export default function Demo() {
  const [workStatus, setWorkStatus] = useState('experienced');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Work status*</Text>

      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, workStatus === 'experienced' && styles.selectedButton]}
          onPress={() => setWorkStatus('experienced')}
        >
          <MaterialIcons name="work" size={18} color={workStatus === 'experienced' ? '#fff' : theme.lighttext} />
          <Text style={[styles.toggleText, workStatus === 'experienced' && styles.selectedText]}>
            I'm experienced
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, workStatus === 'fresher' && styles.selectedButton]}
          onPress={() => setWorkStatus('fresher')}
        >
          <FontAwesome5 name="graduation-cap" size={16} color={workStatus === 'fresher' ? '#fff' : theme.lighttext} />
          <Text style={[styles.toggleText, workStatus === 'fresher' && styles.selectedText]}>
            I'm a fresher
          </Text>
        </TouchableOpacity>
      </View>

    
      <Text style={styles.experienceText}>I have work experience (excluding internships)</Text>

      <View style={styles.uploadBox}>
        <MaterialIcons name="cloud-upload" size={36} color="#ccc" />
        <Text style={styles.uploadText}>Click to upload or drag and drop</Text>
        <Text style={styles.uploadSubtitle}>DOC, DOCX, PDF, RTF (MAX. 2MB)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.cardbg,
    justifyContent: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.bordercolor,
    marginRight: 5,
    
  },
  selectedButton: {
    backgroundColor: theme.bordercolor,
    color:"black",
  },
  toggleText: {
    marginLeft: 5,
    color: theme.lighttext,
  },
  selectedText: {
    color: '#fff',
    
  },
  experienceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  uploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: theme.bordercolor,
    borderRadius: 5,
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Geist',
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 5,
    
  },
});
