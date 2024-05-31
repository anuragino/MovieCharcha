import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FavoritesContext } from '../contexts/FavoritesContext'; // Import FavoritesContext

export default function MovieList({ movies }) {
    const navigate = useNavigate();
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext); // Use the context

    const handleIconClick = (e, movieId) => {
        e.stopPropagation(); // Prevents triggering the parent onClick
        if (favorites[movieId]) {
            removeFromFavorites(movieId);
        } else {
            addToFavorites(movieId);
        }
    };

    return (
        <>
            {movies.map((movie) => (
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
            ))}
        </>
    );
}
