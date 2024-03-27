import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import COLORS from '../components/colors'
import Homepage from '../Homepage'
import Profile from '../Profile'
import Fav from '../Fav'
import Search from '../Search'
import {FontAwesome} from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>

      <Tab.Screen name="Homepage" component={Homepage} 
      options={{
        tabBarLabelStyle: { display: 'none' },
        tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={COLORS.black} size={21}
                />),
      }}/>
      <Tab.Screen name="Search" component={Search} 
      options={{
        tabBarLabelStyle: { display: 'none' },
        tabBarIcon: ({color, size}) => (
            <Ionicons name="search" color={COLORS.black} size={21}
                />),
      }}/>
      <Tab.Screen name="Fav" component={Fav} 
      options={{
        tabBarLabelStyle: { display: 'none' },
        tabBarIcon: ({color, size}) => (
            <Ionicons name="heart" color={COLORS.black} size={21}
                />),
      }}/>
      <Tab.Screen name="Profile" component={Profile} 
      options={{
        /* tabBarLabel: "Profile",*/
        tabBarLabelStyle: { display: 'none' },
        tabBarIcon: ({color, size}) => (
            <FontAwesome name="user-circle-o" color={COLORS.black} size={21}/>
           ),
      }}/>
    </Tab.Navigator>
  );
}