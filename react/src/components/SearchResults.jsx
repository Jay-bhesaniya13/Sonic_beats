// SearchResults.jsx
import React from 'react';
import MusicCard from './MusicCard';

const SearchResults = ({ searchResults }) => {
    return (
        <div className="search-results">
            <h3>Search Results</h3>
            <div className="music-card-par">
                {searchResults.length > 0 ? (
                    searchResults.map((music) => (
                        <MusicCard key={music._id} music={music} />
                    ))
                ) : (
                    <p>No results found for your search.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
