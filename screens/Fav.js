import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import COLORS from './components/colors';
import Header from './components/Header';
import MenuContainer from './components/MenuContainer';
import Ionicons from '@expo/vector-icons/Ionicons';

const Fav = () => {
  const cardData = [
    { id: 1, title: 'Food', description: 'Where to eat in which city?', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg' },
    { id: 2, title: 'Transportation', description: 'The best transportation vehicle for ... city', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg' },
    { id: 3, title: 'Travel Hacks', description: 'For those who are just starting to travel... ', image: 'https://api.dokay.com.tr/storage/1476/63280f8b1e3bc7.40466361.jpg' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: 'geometry' }}
          placeholder="Explore"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyC-PZ-1tHmw9-s2iJeL68HQ5wsA1JVKTUo',
            language: 'en',
          }}
          styles={{
            container: {
              flex: 1,
              width: '100%',
              padding: 16,
              marginTop: 12,
              marginBottom:32,
              opacity: 0.8,
            },
          }}
        />
        <MenuContainer />
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Top Tips</Text>
        <TouchableOpacity style={styles.exploreMore}>
          <Text style={styles.exploreText}>Explore more</Text>
          <Ionicons name="arrow-forward-circle-outline" color={COLORS.black} size={18} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cardData.map(card => (
          <TouchableOpacity key={card.id} style={styles.card}>
            <Image source={{ uri: card.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 16,
  },
  tipsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exploreMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreText: {
    fontSize: 16,
    paddingHorizontal: 4,
  },
  card: {
    width: 200,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    elevation: 5,
    overflow: 'hidden',
    padding: 12,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default Fav;
