import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../../api/axios.js'; 

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await api.get('/api/favorites');
                if (res.data.success) {
                    setFavorites(res.data.favorites);
                }
            } catch (err) {
                console.error("Erreur chargement favoris", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const toggleFavorite = async (book) => {
        try {
            const res = await api.post(`/api/favorites/toggle/${book._id}`);

            if (res.data.success) {
                if (res.data.action === "added") {
                    setFavorites(prev => [...prev, book]);
                } else {
                    setFavorites(prev => prev.filter(fav => fav._id !== book._id));
                }
            }
        } catch (err) {
            console.error("Erreur toggle favoris", err);
            alert("Veuillez vous connecter pour liker un livre");
        }
    };

    const isBookFavorite = (bookId) => {
        return favorites.some((fav) => fav._id === bookId);
    };
    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isBookFavorite, loading }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);