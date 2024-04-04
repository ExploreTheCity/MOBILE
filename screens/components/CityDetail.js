import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from './../components/colors';
import { citiesData } from './constants';

export default class CityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
  }

  handleButtonPress = (text) => {
    let newDescription = '';
    if (text === 'touristic') {
      newDescription = 'Touristic description goes here.';
    } else if (text === 'restaurants') {
      newDescription = 'Restaurants description goes here.';
    } else if (text === 'coffee') {
      newDescription = 'Coffee description goes here.';
    }
    this.setState({ description: newDescription });
  }; 
  
  render() {
    const { route } = this.props;
    const { cityId } = route.params;
    const city = citiesData.find((city) => city.id === cityId);

    return (
      <ScrollView contentContainerStyle={styles.container}>
         <Image source={{ uri: city.image }} style={styles.cityImage} />
        <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.description}>{city.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.handleButtonPress('touristic')}>
            <Text style={styles.buttonText}>Touristic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleButtonPress('restaurants')}>
            <Text style={styles.buttonText}>Restaurants</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleButtonPress('coffee')}>
            <Text style={styles.buttonText}>Coffee</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.selectedDescription}>{this.state.description}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:64,
    padding:16,
    alignItems:"center"  
  },
  cityImage: {
    width: 360,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
    padding:12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 64,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDescription: {
    fontSize: 16,
    marginTop: 20,
  },
});