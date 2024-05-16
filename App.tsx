import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-get-random-values';

import HomeScreen from './src/screens/homeScreen';
import AddScreen from './src/screens/addScreen';
import SummaryScreen from './src/screens/summaryScreen';
import CategoryDetailScreen from './src/screens/categoryDetailScreen'; // Import the screen
import NoteDetailScreen from './src/screens/noteDetailScreen';
import SettingsScreen from './src/screens/settingsScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import AboutScreen from './src/screens/aboutUsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarStyle: {backgroundColor: '#340E59', borderTopColor: '#340E59'},
      }}>
      <Tab.Screen
        name="MainHome"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarLabel: 'New Note',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          tabBarLabel: 'Summary',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="chart-pie"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#340E59', // 设置为你的主题紫色
          },
          headerTintColor: '#fff', // 设置标题颜色为白色
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="AboutUs" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
