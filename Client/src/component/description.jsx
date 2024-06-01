import React, { useState, useEffect, useContext } from 'react';
import Header from './header';
import { useParams,NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faTrophy,faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FavoritesContext } from '../contexts/FavoritesContext'; // Import FavoritesContext
import { authContext } from "../contexts/authContext";

const Description = () => {
    const { imdbID } = useParams();
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
    const loggedData = useContext(authContext);
    const [data, setData] = useState({});

    const singleMovie = async () => {
        const url = `https://moviecharcha-api.vercel.app/single/${imdbID}`;
    
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${loggedData.loggedUser.token}`
                }
            });
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error("Failed to fetch movie:", error);
        }
    };

    useEffect(() => {
        singleMovie();
    }, [imdbID]);

    const goBack = () => {
        window.history.back();
    };

    const isFavorite = favorites.some(fav => fav.imdbID === imdbID);

    return (
        <article className='home'>
            <Header headingName="MovieCharcha" />
            <section className="movie-container">
                <div className="back-arrow" onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </div>
                
                <div className="movie-poster">
                    <img src={data.Poster} alt="Movie Poster" />
                </div>
                <article className="movie-details">
                    <div className="details-header">
                        <div className="dh-ls">
                            <h2>{data.Title}</h2>
                        </div>
                        <div className="dh-rs">
                            <FontAwesomeIcon
                                icon={faBookmark}
                                style={{ color: isFavorite ? 'red' : 'white', cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isFavorite) {
                                        removeFromFavorites(imdbID);
                                    } else {
                                        addToFavorites(imdbID);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <span className="italics-text">
                        <i>{data.Year} &#x2022; {data.Country} &#x2022; Rating -
                            <span style={{ fontSize: '18px', fontWeight: '600' }}>
                                {data.imdbRating}
                            </span>/10
                        </i>
                    </span>
                    <ul className="details-ul">
                        <li><strong>Actors: </strong>{data.Actors}</li>
                        <li><strong>Director: </strong>{data.Director}</li>
                        <li><strong>Writers: </strong>{data.Writer}</li>
                    </ul>
                    <ul className="details-ul">
                        <li><strong>Genre: </strong>{data.Genre}</li>
                        <li><strong>Release Date: </strong>{data.DVD}</li>
                        <li><strong>Box Office: </strong>{data.BoxOffice}</li>
                        <li><strong>Movie Runtime: </strong>{data.Runtime}</li>
                    </ul>
                    <p style={{ marginTop: '10px' }}>{data.Plot}</p>
                    <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#eebfbf', marginTop: '10px' }}>
                        <FontAwesomeIcon icon={faTrophy} style={{ color: 'white' }} />
                        &thinsp; {data.Awards}
                    </p>
                </article>
            </section>
        </article>
    );
};

export default Description;
