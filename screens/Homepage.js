import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import Header from "./components/Header";
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CityCards from './components/CityCards';
import Footer from './components/Footer';


const Homepage = () => {


  return (

    <SafeAreaView>
    <ScrollView>
      
    <View style={{ margin: 6 }}>
        <Header />
      </View>
      
      <CityCards />

      <Footer />

    </ScrollView></SafeAreaView>
  );
};
export default Homepage;