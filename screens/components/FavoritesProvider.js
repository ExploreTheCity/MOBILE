import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('@favorite_cities');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.log('Error loading favorites:', error.message);
      }
    };

    loadFavorites();
  }, []);

  const addFavorite = async (city) => {
    const updatedFavorites = [...favorites, city];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('@favorite_cities', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = async (cityId) => {
    const updatedFavorites = favorites.filter((city) => city.id !== cityId);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('@favorite_cities', JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
