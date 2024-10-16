import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicCard from './MusicCard'; // Import MusicCard component

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylists = async () => {
            const storedUser = localStorage.getItem('userData'); // Get userData from localStorage
            const token = localStorage.getItem('token'); // Get the token from localStorage

            if (!storedUser) {
                setError('No user found. Please login.');
                navigate('/login');
                return;
            }

            const user = JSON.parse(storedUser); // Parse the stored user data

            if (!user || !user.playlists || user.playlists.length === 0) {
                setError('No playlists found for the user.');
                setLoading(false);
                return;
            }

            try {
                // Fetch playlists by user playlist IDs
                const fetchPlaylistPromises = user.playlists.map(async (playlistId) => {
                    const response = await fetch(`http://localhost:3000/playlist/${playlistId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Pass token in the headers
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to fetch playlist with ID ${playlistId}`);
                    }

                    return response.json(); // Returns the playlist object
                });

                // Wait for all promises to resolve
                const playlistsData = await Promise.all(fetchPlaylistPromises);
                setPlaylists(playlistsData); // Set playlists data
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, [navigate]);

    const handleAddSongToPlaylist = (musicId) => {
        // Handle add song to playlist functionality here
        console.log(`Add song with ID ${musicId} to playlist`);
    };

    if (loading) {
        return <p>Loading playlists...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="playlist-page">
            <h2>Your Playlists</h2>
            {playlists.length === 0 ? (
                <p>No playlists found.</p>
            ) : (
                <div>
                    {playlists.map((playlist) => (
                        <div key={playlist._id}>
                            <h3>{playlist.name}</h3>
                            <p>{playlist.description}</p>
                            <div className="music-card-par"> {/* Updated parent class here */}
                                {playlist.songs.map((song) => (
                                    <MusicCard key={song._id} music={song} onAddSong={() => handleAddSongToPlaylist(song._id)} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Playlist;
