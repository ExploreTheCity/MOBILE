import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavoritesContext } from "./components/FavoritesContext";
import { citiesData } from "./components/constants";
import Header from "./components/Header";

const Fav = ({ navigation }) => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const navigateToCityDetail = (cityId) => {
    navigation.navigate("CityDetail", { cityId });
  };

  const renderFavoriteItem = ({ item }) => {
    const city = citiesData.find((city) => city.id === item.id);

    return (
      <View style={styles.favoriteItem}>
        <TouchableOpacity onPress={() => navigateToCityDetail(city.id)}>
          <Image source={{ uri: city.image }} style={styles.cityImage} />
        </TouchableOpacity>
        <View style={styles.favoriteDetails}>
          <Ionicons name="star" size={12} color="orange" />
          <Text style={styles.cityName}>{city.name}</Text>
          <Text style={styles.cityShortDesc}>{city.shortdesc}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removeFavorite(city.id)}
          style={styles.removeButton}
        >
          <Ionicons name="close-circle-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*       <Header /> */}
      <Text style={styles.title}>
        Favorite Cities <Ionicons name="heart" size={14} color="red" />{" "}
      </Text>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorites found.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 12,
    color: "#333",
  },
  noFavoritesText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
    margin: 12,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 16,
  },
  cityImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  favoriteDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cityShortDesc: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    padding: 8,
  },
});

export default Fav;
