import { useContext, useEffect, useState } from "react";
import Header from "../component/header";
import SearchBox from "../component/searchBox";
import MoiveList from "../component/moiveList";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");

    const getMovieRequest = async () => {
        const url = `https://www.omdbapi.com/?s=${search}&apikey=f3686a30`;

        try {
            const response = await fetch(url);
            const responseJson = await response.json();

            if (responseJson.Search) {
                setMovies(responseJson.Search);
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        }
    };

    useEffect(() => {
        if (search) {
            getMovieRequest();
        }
    }, [search]);

    return (
        <div className="home">
            <Header />
            
            <section className="search-movie">
                <SearchBox search={search} setSearch={setSearch} />
            </section>
            
            <section className="show-movie">
                <MoiveList movies={movies} />
            </section>
            
        </div>
    );
}
