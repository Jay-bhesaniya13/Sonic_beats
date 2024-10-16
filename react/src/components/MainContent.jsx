import React from 'react';
import MusicCard from './MusicCard';
import { FaSearch } from 'react-icons/fa';

const MainContent = ({
    trendingMusic,
    bhajanMusic,
    popMusic,
    aartiMusic,
    showSearch,
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleSearchIconClick,
    handleMusicCardClick,
}) => {
    return (
        <div className="main-content">
            <div className="search-container">
                <FaSearch
                    onClick={handleSearchIconClick}
                    className="search-icon"
                    style={{ fontSize: '24px', cursor: 'pointer' }}
                />
            </div>

            {/* Centered Search Bar */}
            {showSearch && (
                <div className="search-bar-centered">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search for music..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
            )}

            {/* Music Sections */}
            {trendingMusic.length > 0 && (
                <>
                    <h3>Trending Music</h3>
                    <div className="music-card-par">
                        {trendingMusic.map((music, index) => (
                            <MusicCard
                                key={music._id}
                                music={music}
                                onClick={() => handleMusicCardClick(music, index)}
                            />
                        ))}
                    </div>
                </>
            )}

            {bhajanMusic.length > 0 && (
                <>
                    <h3>Bhajan Music</h3>
                    <div className="music-card-par">
                        {bhajanMusic.map((music, index) => (
                            <MusicCard
                                key={music._id}
                                music={music}
                                onClick={() => handleMusicCardClick(music, index)}
                            />
                        ))}
                    </div>
                </>
            )}

            {popMusic.length > 0 && (
                <>
                    <h3>Pop/Party Music</h3>
                    <div className="music-card-par">
                        {popMusic.map((music, index) => (
                            <MusicCard
                                key={music._id}
                                music={music}
                                onClick={() => handleMusicCardClick(music, index)}
                            />
                        ))}
                    </div>
                </>
            )}

            {aartiMusic.length > 0 && (
                <>
                    <h3>Aarti Music</h3>
                    <div className="music-card-par">
                        {aartiMusic.map((music, index) => (
                            <MusicCard
                                key={music._id}
                                music={music}
                                onClick={() => handleMusicCardClick(music, index)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MainContent;
