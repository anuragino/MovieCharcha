import { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState({});

    const addToFavorites = (movieId) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [movieId]: true
        }));
    };

    const removeFromFavorites = (movieId) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = { ...prevFavorites };
            delete updatedFavorites[movieId];
            return updatedFavorites;
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
