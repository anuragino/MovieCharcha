import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FavoritesContext } from '../contexts/FavoritesContext'; // Import FavoritesContext
import Header from '../component/header';

const WatchList = () => {
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
    const navigate = useNavigate();

    const isFavorite = (movieId) => favorites.some(fav => fav.imdbID === movieId);

    const handleIconClick = (e, movieId) => {
        e.stopPropagation(); // Prevents triggering the parent onClick
        if (isFavorite(movieId)) {
            removeFromFavorites(movieId);
        } else {
            addToFavorites(movieId);
        }
    };

    return (
        <div className='home'>
            <Header headingName="WatchList" />

            <section className="show-movie">
                {
                    favorites.map((movie) => (
                        <div
                            key={movie.imdbID}
                            className="fav-item"
                            onClick={() => navigate(`/description/${movie.imdbID}`)}
                        >
                            <div className="fav-poster">
                                <img src={movie.poster} alt="Movie" />
                            </div>
                            <div className="fav-details">
                                <div className="fav-details-box">
                                    <div>
                                        <p className="fav-movie-name">{movie.title}</p>
                                        <p className="fav-movie-rating">
                                            {movie.year}
                                        </p>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faBookmark}
                                            style={{ color: isFavorite(movie.imdbID) ? 'red' : 'white', cursor: 'pointer' }}
                                            onClick={(e) => handleIconClick(e, movie.imdbID)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </section>
        </div>
    );
};

export default WatchList;
