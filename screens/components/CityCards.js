import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { citiesData } from "./constants";

export default function CityCards() {
 

  const popularCities = citiesData.slice(0, 6); // Adjust the number of popular cities you want to show initially

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(popularCities); // Initially show popular cities

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = citiesData.filter((city) =>
      city.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("CityDetail");
  };

  return (
    <ScrollView>
      {/* Search Box */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for places or events in Turkey"
          placeholderTextColor="#999999"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      <View style={styles.content}>
        {filteredCities.map((city) => (
          <TouchableOpacity
            key={city.id}
            style={styles.card}
            onPress={() => handleCardPress(city)}
          >
            <Image source={{ uri: city.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{city.name}</Text>
            <Text style={styles.cardDescription}>{city.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    alignItems: "center",
  },
  searchInput: {
    width: "100%",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    fontSize: 16,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: 20,
  },
  card: {
    width: "45%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
  cardDescription: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 10,
  },
});
