import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicCard from './MusicCard'; // Import MusicCard component
import MusicPlayer from './MusicPlayer'; // Import the MusicPlayer component

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredMusic, setFilteredMusic] = useState([]); // A local music list for easy handling

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
                setFilteredMusic(playlistsData.flatMap(playlist => playlist.songs)); // Set filteredMusic to songs for playback
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, [navigate]);

    const handleRemoveSongFromPlaylist = async (playlistId, musicId) => {
        const token = localStorage.getItem('token'); // Get token from localStorage

        try {
            const response = await fetch(`http://localhost:3000/playlist/${playlistId}/remove/${musicId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`, // Pass token in the headers
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove song from playlist.');
            }

            // Update the frontend by removing the song from the playlist state
            setPlaylists((prevPlaylists) =>
                prevPlaylists.map((playlist) =>
                    playlist._id === playlistId
                        ? {
                            ...playlist,
                            songs: playlist.songs.filter((song) => song._id !== musicId),
                        }
                        : playlist
                )
            );
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleMusicCardClick = (music, index) => {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = `/assets/${music.filePath}`;
        audioPlayer.play();
        setIsPlaying(true);
        setCurrentTrack(music);
        setCurrentIndex(index);
    };

    const togglePlayPause = () => {
        const audioPlayer = document.getElementById('audioPlayer');
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        setIsPlaying(!isPlaying);
    };

    const onTimeUpdate = () => {
        const audioPlayer = document.getElementById('audioPlayer');
        setCurrentTime(audioPlayer.currentTime);
        setDuration(audioPlayer.duration);
    };

    const handleSeek = (event) => {
        const audioPlayer = document.getElementById('audioPlayer');
        const seekTime = (event.target.value / 100) * duration;
        audioPlayer.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const handleSongEnd = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < filteredMusic.length) {
            handleMusicCardClick(filteredMusic[nextIndex], nextIndex);
        } else {
            setIsPlaying(false);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
                            <div className="music-card-par">
                                {playlist.songs.map((song, index) => (
                                    <MusicCard
                                        key={song._id}
                                        music={song}
                                        buttonContent="-"
                                        onAddSong={() => handleRemoveSongFromPlaylist(playlist._id, song._id)}
                                        onCardClick={() => handleMusicCardClick(song, index)} // Handle music card click
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Music Player */}
            <MusicPlayer
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                currentTime={currentTime}
                duration={duration}
                handleSeek={handleSeek}
                formatTime={formatTime}
                onTimeUpdate={onTimeUpdate}
                handleSongEnd={handleSongEnd}
            />
        </div>
    );
};

export default Playlist;
