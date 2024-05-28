import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Homepage from "../Homepage";
import Profile from "../Profile";
import Fav from "../Fav";
import Search from "../Search";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLORS from "../components/colors";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={COLORS.black} size={21} />
          ),
        }}
      />
      <Tab.Screen
        name="Guide"
        component={Search}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={COLORS.black} size={21} />
          ),
        }}
      />
      <Tab.Screen
        name="Fav"
        component={Fav}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          /* tabBarLabel: "Profile",*/
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
