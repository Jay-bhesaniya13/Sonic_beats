import React, { useState, useEffect } from 'react';
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
    const [user, setUser] = useState(null);
    const [favouriteName, setFavouriteName] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.id) {
                    setUser(parsedUser);
                    setFavouriteName(`${parsedUser.username}'s Favourites`);
                } else {
                    alert('Invalid user data. Please log in again.');
                    localStorage.removeItem('userData');
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        } else {
            alert('No user data found. Please log in.');
        }
    }, []);

   const handleAddSongToFavourites = async (musicId) => {
  const user = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');

  if (!user || !token) {
    alert('Please login to add to favourites');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/favourite/user/${user.id}/add/${musicId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.alreadyExists) {
      alert('Song is already in your favourites.');
    } else {
      alert('Song added to your favourites.');
    }
  } catch (error) {
    console.error('Error adding song:', error);
    alert('Failed to add song to favourites.');
  }
};


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <div className="main-content">
            <div className="search-container">
                <FaSearch
                    onClick={handleSearchIconClick}
                    className="search-icon"
                    style={{ fontSize: '24px', cursor: 'pointer' }}
                />
            </div>

            {showSearch && (
                <div className="search-bar-centered">
                    <form onSubmit={handleSearchSubmit}>
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

            {trendingMusic.length > 0 && (
                <>
                    <h3>Trending Music</h3>
                    <div className="music-card-par">
                        {trendingMusic.map((music, index) => (
                            <MusicCard
                                key={music._id}
                                music={music}
                                onCardClick={() => handleMusicCardClick(music, index)}
                                onAddSong={() => handleAddSongToFavourites(music._id)}
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
                                onCardClick={() => handleMusicCardClick(music, index)}
                                onAddSong={() => handleAddSongToFavourites(music._id)}
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
                                onCardClick={() => handleMusicCardClick(music, index)}
                                onAddSong={() => handleAddSongToFavourites(music._id)}
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
                                onCardClick={() => handleMusicCardClick(music, index)}
                                onAddSong={() => handleAddSongToFavourites(music._id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MainContent;
