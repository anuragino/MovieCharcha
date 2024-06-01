import { useContext, useEffect, useState } from "react";
import Header from "../component/header";
import SearchBox from "../component/searchBox";
import MoiveList from "../component/moiveList";
import { authContext } from "../contexts/authContext";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    // Context Data (Globally exist)
    const loggedData = useContext(authContext);

    const getMovieRequest = async () => {
        const url = `http://localhost:3000/api/${search}`;

        try {
            const response = await fetch(url,{
                method:"GET",
                headers:{
                    "Authorization" : `Bearer ${loggedData.loggedUser.token}`
                }
            });
            const responseJson = await response.json();

            if (responseJson.Search) {
                setMovies(responseJson.Search);
            } else {
                setMovies([]); // If there are no search results, set movies to an empty array
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        }
    };

    useEffect(() => {
        if (search || movies.length === 0) {
            getMovieRequest();
        }
    }, [search]); // Re-fetch when search changes or movies array is empty

    return (
        <div className="home">
            <Header headingName="MovieCharcha" />
            
            <section className="search-movie">
                <SearchBox search={search} setSearch={setSearch} />
            </section>
            
            <section className="show-movie">
                {movies.length === 0 && search === "" ? (
                    <img className="no-result" src="empty.svg" alt="No Results" />
                ) : (
                    <MoiveList movies={movies} />
                )}
            </section>
        </div>
    );
}
