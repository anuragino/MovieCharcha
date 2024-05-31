import React, { useState, useEffect, useContext } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FavoritesContext } from '../contexts/FavoritesContext'; // Import FavoritesContext
import { authContext } from "../contexts/authContext";
import Header from '../component/header';



const WatchList = () => {
    const { imdbID } = useParams();
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
    // Context Data (Globaly exist)
    const loggedData = useContext(authContext); 

    const [data, setData] = useState({});


    const navigate = useNavigate();

    const handleIconClick = (e, movieId) => {
        e.stopPropagation(); // Prevents triggering the parent onClick
        if (favorites[movieId]) {
            removeFromFavorites(movieId);
        } else {
            addToFavorites(movieId);
        }
    };

    return (
        <div>
            <Header headingName="WatchList" />
            <h4>hello watchlist</h4>

            {
                console.log(favorites)
            }
            {/* {favorites.map((movie) => (
                <div
                    key={movie.imdbID}
                    className="fav-item"
                    onClick={() => navigate(`/description/${movie.imdbID}`)}
                >
                    <div className="fav-poster">
                        <img src={movie.Poster} alt="Movie" />
                    </div>
                    <div className="fav-details">
                        <div className="fav-details-box">
                            <div>
                                <p className="fav-movie-name">{movie.Title}</p>
                                <p className="fav-movie-rating">
                                    {movie.Year}
                                </p>
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={faBookmark}
                                    style={{ color: favorites[movie.imdbID] ? 'red' : 'white', cursor: 'pointer' }}
                                    onClick={(e) => handleIconClick(e, movie.imdbID)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))} */}
        </div>
    );
};

export default WatchList;
