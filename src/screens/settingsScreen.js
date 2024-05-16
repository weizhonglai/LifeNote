import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './utils/style';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleClearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to delete all note data?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Yes',
          onPress: async () => {
            await AsyncStorage.removeItem('notes');
            Alert.alert('Cache Cleared', 'All note data has been deleted.');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const settingsOptions = [
    {title: 'Clear Cache', icon: 'file-document', onPress: handleClearCache},
    {title: 'Privacy Policy', icon: 'shield-account', screen: 'PrivacyPolicy'},
    {title: 'About Us', icon: 'information', screen: 'AboutUs'},
  ];

  return (
    <ScrollView style={styles.container}>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={
            option.onPress || (() => navigation.navigate(option.screen))
          }>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons
              name={option.icon}
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.optionText}>{option.title}</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SettingsScreen;
