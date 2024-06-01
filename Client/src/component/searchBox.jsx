import React from 'react';


export default function SearchBox({ search, setSearch }){
    return (
        <div className="searchBox">
          <input
            type="text"
            className="inp"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Moives..."
          />
        </div>
    );
}