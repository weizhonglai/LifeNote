import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage', error);
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, [key]);

  const saveValue = async (newValue) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, jsonValue);
      setStoredValue(newValue);
    } catch (error) {
      console.error('Error saving data to AsyncStorage', error);
    }
  };

  return [storedValue, saveValue, isLoading];
};
