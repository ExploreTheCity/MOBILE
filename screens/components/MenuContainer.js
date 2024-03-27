import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MenuContainer = () => {
  const handleHotelPress = () => {
    console.log("Hotel clicked");
  };

  const handleRestaurantPress = () => {
    console.log("Restaurant clicked");
  };

  const handleActivitiesPress = () => {
    console.log("Activities clicked");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={handleHotelPress}>
        <Image source={require("./../../assets/hotels.png")} style={styles.image} />
        <Text style={styles.text}>HOTELS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={handleRestaurantPress}>
        <Image source={require("./../../assets/restaurants.png")} style={styles.image} />
        <Text style={styles.text}>RESTAURANTS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={handleActivitiesPress}>
        <Image source={require("./../../assets/activities.png")} style={styles.image} />
        <Text style={styles.text}>ACTIVITIES</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
    columnGap:24,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 16,
  },
  image: {
    width: 56,
    height: 56,
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: 500,
    textAlign: 'center',
  },
});

export default MenuContainer;