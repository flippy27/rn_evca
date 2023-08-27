import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewCardForm } from './AddNewCardForm'; // Adjust the path based on your project structure
import { SafeAreaView } from 'react-native-safe-area-context';
import { HoldingBlock } from '../components/HoldingBlock';

const AddNewCardView = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Load data from AsyncStorage on app start
    loadData();
  }, []);

  const saveData = async (data) => {
    try {
      // Save data to AsyncStorage
      await AsyncStorage.setItem('formData', JSON.stringify(data));
      setFormData(data);
      console.log(data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      // Load data from AsyncStorage
      const data = await AsyncStorage.getItem('formData');
      if (data) {
        setFormData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={{pading:20}}>
        <HoldingBlock>
      <NewCardForm onSave={saveData} />
      {formData && (
          <Text>Stored Data: {formData.fullName}</Text>
          )}
          </HoldingBlock>
          </View>
    </SafeAreaView>
  );}
export default AddNewCardView;