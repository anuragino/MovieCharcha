import { createContext, useContext, useState, useEffect } from 'react';
import { authContext } from "./authContext";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Context Data (Globally exist)
    const loggedData = useContext(authContext);

    const singleMovie = async (imdbID) => {
        const url = `https://moviecharcha-api.vercel.app/single/${imdbID}`;
    
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${loggedData.loggedUser.token}`
                }
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error("Failed to fetch movie:", error);
        }
    };

    const addToFavorites = async (imdbID) => {
        
        const movieData = await singleMovie(imdbID); // Wait for movie data to be fetched

        const favItem = {
            userId: loggedData.loggedUser.userid,
            imdbID: imdbID,
            poster: movieData.Poster,
            title: movieData.Title,
            year: movieData.Year,
        };

        fetch("https://moviecharcha-api.vercel.app/favourite", {
            method: "POST",
            body: JSON.stringify(favItem),
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log("Response Status:", response.status);
            return response.json();
        })
        .then((data) => {
            console.log("Response Data:", data);
            setFavorites((prevFavorites) => [...prevFavorites, favItem]);
        })
        .catch((err) => {
            console.log("Fetch Error:", err);
        });
    };

    const removeFromFavorites = (imdbID) => {
        const url = `https://moviecharcha-api.vercel.app/favourite/${loggedData.loggedUser.userid}/${imdbID}`;

        fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log("Response Status:", response.status);
            return response.json();
        })
        .then((data) => {
            console.log("Response Data:", data);
            setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.imdbID !== imdbID));
        })
        .catch((err) => {
            console.log("Fetch Error:", err);
        });
    };

    const fetchFavorites = () => {
        const url = `https://moviecharcha-api.vercel.app/favourite/${loggedData.loggedUser.userid}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log("Response Status:", response.status);
            return response.json();
        })
        .then((data) => {
            setFavorites(data);
        })
        .catch((err) => {
            console.log("Fetch Error:", err);
        });
    };

    useEffect(() => {
        if (loggedData.loggedUser && loggedData.loggedUser.userid) {
            fetchFavorites(loggedData.loggedUser.userid);
        }
    }, [loggedData.loggedUser]);

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
