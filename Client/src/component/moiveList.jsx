import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FavoritesContext } from '../contexts/FavoritesContext'; 

export default function MovieList({ movies }) {
    const navigate = useNavigate();
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext); // Use the context

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
        <>
            {movies.map((movie) => (
                <section
                    key={movie.imdbID}
                    className="fav-item"
                    onClick={() => navigate(`/description/${movie.imdbID}`)}
                >
                    <div className="fav-poster">
                        <img src={movie.Poster} alt="Movie" />
                    </div>
                    <section className="fav-details">
                        <article className="fav-details-box">
                            <div>
                                <p className="fav-movie-name">{movie.Title}</p>
                                <p className="fav-movie-rating">
                                    {movie.Year}
                                </p>
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={faBookmark}
                                    style={{ color: isFavorite(movie.imdbID) ? 'red' : 'white', cursor: 'pointer' }}
                                    onClick={(e) => handleIconClick(e, movie.imdbID)}
                                />
                            </div>
                        </article>
                    </section>
                </section>
            ))}
        </>
    );
}
