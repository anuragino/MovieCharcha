import React, { useState, useEffect,useContext } from 'react';
import Header from './header';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { authContext } from "../contexts/authContext";


const Description = () => {
    const { imdbID } = useParams();

    const [data, setData] = useState({});
    // Context Data (Globaly exist)
    const loggedData = useContext(authContext); 

    const singleMovie = async () => {
        const url = `http://localhost:3000/single/${imdbID}`;
    
        try {
            const response = await fetch(url,{
                method:"GET",
                headers:{
                    "Authorization" : `Bearer ${loggedData.loggedUser.token}`
                }
            });
            const responseData = await response.json();
            console.log(responseData); // Log the parsed JSON data
            setData(responseData); // Set the data state with the parsed JSON data
        }catch (error) {
            console.error("Failed to fetch movies:", error);
        }
    };
    

    useEffect(() => {
        singleMovie();
    }, []);

    return (
        <div>
            <Header />
            <div className="movie-container">
                <div className="movie-poster">
                    <img src={data.Poster} alt="Movie Poster" />
                </div>
                <div className="movie-details">
                    <div className="details-header">
                        <div className="dh-ls">
                            <h2>{data.Title}</h2>
                        </div>
                        <div className="dh-rs">
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
                    <p style={{marginTop: '10px' }}>{data.Plot}</p>
                    <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#eebfbf', marginTop: '10px' }}>
                        <FontAwesomeIcon icon={faTrophy} style={{ color: 'white' }} />
                        &thinsp; {data.Awards}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Description;
