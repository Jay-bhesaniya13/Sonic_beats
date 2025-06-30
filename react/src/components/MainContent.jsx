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
    const [playlistName, setPlaylistName] = useState('');

    // Load the user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        console.log("Stored user:", storedUser);

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);

                if (parsedUser && parsedUser.id) {
                    setUser({
                        ...parsedUser,
                        playlists: parsedUser.playlists || [] // Initialize playlists if undefined
                    });
                    setPlaylistName(`${parsedUser.username}'s Playlist`);
                } else {
                    console.error('User not found in localStorage or missing _id');
                    alert('User not found in localStorage or missing user ID');
                }
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        } else {
            console.error('No user data found in localStorage');
            alert('No user data found. Please log in.');
        }
    }, []);

    // Log user data when it changes
    useEffect(() => {
        if (user) {
            console.log("Updated user data:");
            console.log(user);
        }
    }, [user]); // This will log user data whenever the user state changes

    // Function to add a song to the user's playlist
    const handleAddSongToPlaylist = async (musicId) => {
        if (!user) {
            alert('User not logged in');
            return;
        }

        try {
            console.log("user.id passed to create/update playlist : ")
            console.log(user.id)
            // Check if the user has any playlists in their playlists array
            let userPlaylist = user.playlists && user.playlists[0]; // Safely access playlists array

            if (!userPlaylist) {
                // No playlist exists, so create a new one
                const createResponse = await fetch('http://localhost:3000/playlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        name: playlistName,  // Playlist name, e.g., "John's Playlist"
                        description: 'My favorite songs',
                        songs: [musicId],  // Add the selected song to the playlist
                        userId: user.id,  // Reference to the user ID
                    }),
                });

                if (!createResponse.ok) {
                    const errorData = await createResponse.json();
                    alert(errorData.message || 'Failed to create playlist');
                    return;
                }

                const newPlaylist = await createResponse.json(); // Store the newly created playlist
                userPlaylist = newPlaylist;  // Set the new playlist for future song additions

                // Update localStorage with the new playlist
                const updatedUser = { ...user, playlists: [newPlaylist._id] };
                localStorage.setItem('userData', JSON.stringify(updatedUser));
                setUser(updatedUser); // Update the user state with the new playlist
                
                alert(`New playlist created and song added to ${playlistName}`);
            } else {
                // Playlist exists, just add the song to it
                const addSongResponse = await fetch(`http://localhost:3000/playlist/${userPlaylist}/add/${musicId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!addSongResponse.ok) {
                    const errorData = await addSongResponse.json();
                    alert(errorData.message || 'Failed to add song to playlist');
                    return;
                }

                alert(`Song added to ${playlistName}`);
            }

        } catch (error) {
            console.error('Error adding song to playlist:', error);
            alert('An error occurred. Please try again.');
        }
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
                          onCardClick={() => handleMusicCardClick(music, index)} // Pass the click handler
                          onAddSong={() => handleAddSongToPlaylist(music._id)}
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
                                onAddSong={() => handleAddSongToPlaylist(music._id)}
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
                                onAddSong={() => handleAddSongToPlaylist(music._id)}
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
                                onAddSong={() => handleAddSongToPlaylist(music._id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MainContent;