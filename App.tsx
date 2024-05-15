import React from 'react';
import 'react-native-get-random-values';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/homeScreen'; 
import AddScreen from './src/screens/addScreen'; 
import SummaryScreen from './src/screens/summaryScreen';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,  // Hide header for all screens within this navigator
        tabBarActiveTintColor: '#FFFFFF',  // White color for the active tab label and icon
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',  // Slightly transparent white for inactive tabs
        tabBarStyle: {  // Styles for the tab bar
          backgroundColor: '#340E59',  // Matching the dark purple theme
          borderTopColor: '#340E59',  // Same as background color to hide the top border
        }
      }}
    >
      <Tab.Screen 
        name="MainHome" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddScreen}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name="Summary" 
        component={SummaryScreen}
        options={{
          tabBarLabel: 'Summary',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-pie" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <HomeTabs />
    </NavigationContainer>
  );
}

export default App;
