import React from 'react';
import { useNavigate } from 'react-router-dom';  // Make sure to import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

export default function MovieList({ movies }) {
    const navigate = useNavigate();
    
    // const addToFavorites = (imdbId) => {
    //     // Implement your addToFavorites logic here
    //     console.log(`Added movie with ID ${imdbID} to favorites`);
    // };

    

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
                                    style={{ color: 'white', cursor: 'pointer' }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents triggering the parent onClick
                                        addToFavorites(movie.imdbId);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
