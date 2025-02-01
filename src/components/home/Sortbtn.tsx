import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Modal,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const tabsData = [
  { name: 'location', options: ['Delhi', 'Bangalore', 'Pune', 'Punjab', 'Mumbai', 'Mangalore', 'Noida'] },
  { name: 'industry', options: ['Technology', 'Social Media', 'Entertainment', ' Semiconductors', 'Software','E-commerce','Cloud Computing','Streaming','Transportation','Professional Networking'] },
  { name: 'Company size', options: ['10', '50', '200', '500', '1000'] },
  { name: 'Speciality', options: ['Cloud Storage', 'Video Conferencing', 'Electric Vehicles', 'Payments', 'News','Email','Recruiting'] },
  { name: 'Technology', options: ['React', 'JavaScript', 'Node.js', 'Python', 'Apex', 'CRM', 'C++', ' Adobe Creative Cloud', 'Java'] },
];

const Sortbtn = ({ isVisible, onClose, onApply }:any) => {
  const [activeTab, setActiveTab] = useState(tabsData[0].name);
  
  // Store selected options in an object with tab name as key
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({});

  const handleOptionSelect = (tab: string, option: string) => {
    setSelectedOptions(prev => {
      const updatedTabOptions = prev[tab] ? [...prev[tab]] : [];
      if (updatedTabOptions.includes(option)) {
        return { ...prev, [tab]: updatedTabOptions.filter(item => item !== option) };
      }
      return { ...prev, [tab]: [...updatedTabOptions, option] };
    });
  };

  const handleClearAll = () => {
    setSelectedOptions({});
  };

  const handleApply = () => {
    // Pass the selected options along with their tab names
    const selectedData = Object.entries(selectedOptions).map(([name, options]) => ({
      name,
      options,
    }));
    onApply(selectedData); // Passing both tab name and selected options3
    // console.log(selectedData);
    onClose();
  };

  const TabItem = ({ name }:any) => (
    <TouchableOpacity 
      onPress={() => setActiveTab(name)}
      style={[styles.tab, activeTab === name && styles.activeTab]}
    >
      <Text style={[styles.tabText, activeTab === name && styles.activeTabText]}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const CheckboxItem = ({ tab, label }:any) => (
    <TouchableOpacity 
      style={styles.checkboxContainer}
      onPress={() => handleOptionSelect(tab, label)}
    >
      <View style={[styles.checkbox, selectedOptions[tab]?.includes(label) && styles.checkboxChecked]} />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <SafeAreaView style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.title}>Filter</Text>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                  {tabsData.map(tab => (
                    <TabItem key={tab.name} name={tab.name} />
                  ))}
                </ScrollView>

                <View style={styles.contentContainer}>
                  <ScrollView style={styles.scrollContent}>
                    <View style={styles.technologiesGrid}>
                      {tabsData.find(tab => tab.name === activeTab)?.options.map(option => (
                        <CheckboxItem key={option} tab={activeTab} label={option} />
                      ))}
                    </View>
                  </ScrollView>
                </View>

                <View style={styles.footer}>
                  <TouchableOpacity 
                    style={styles.clearButton}
                    onPress={handleClearAll}
                  >
                    <Text style={styles.clearButtonText}>Clear all</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.applyButton}
                    onPress={handleApply}
                  >
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get('window').height * 0.9,
  },
  modalContent: {
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabsContainer: {
    marginVertical: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: 'red',
  },
  tabText: {
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
  contentContainer: {
    marginVertical: 15,
  },
  scrollContent: {
    maxHeight: 200,
  },
  technologiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#333',
  },
  applyButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  applyButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Sortbtn;
