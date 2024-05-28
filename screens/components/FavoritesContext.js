import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (city) => {
    setFavorites((prevFavorites) => [
      ...prevFavorites,
      { ...city, isFavorite: true },
    ]);
  };

  const removeFavorite = (cityId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((city) => city.id !== cityId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
