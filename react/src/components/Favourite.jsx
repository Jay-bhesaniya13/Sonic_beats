import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicCard from './MusicCard';
import MusicPlayer from './MusicPlayer';

const Favourite = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavourites = async () => {
            const storedUser = localStorage.getItem('userData');
            const token = localStorage.getItem('token');

            if (!storedUser) {
                setError('No user found. Please login.');
                navigate('/login');
                return;
            }

            const user = JSON.parse(storedUser);

            try {
                const response = await fetch(`http://localhost:3000/favourite/user/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch favourite songs');
                }

                const data = await response.json();
                setFavourites(data.favourites || []);  // ← Fixed here
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchFavourites();
    }, [navigate]);

    const handleRemoveSong = async (musicId) => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('userData'));

        try {
            const response = await fetch(`http://localhost:3000/favourite/user/${user.id}/remove/${musicId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove song from favourites.');
            }

            const updated = await response.json();
            setFavourites(updated.favourites || []);
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
        if (nextIndex < favourites.length) {
            handleMusicCardClick(favourites[nextIndex], nextIndex);
        } else {
            setIsPlaying(false);
        }
    };

    const handleAddToFavourites = async (musicId) => {
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


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (loading) return <p>Loading favourite songs...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!favourites || favourites.length === 0) return <p>Your favourite list is empty.</p>;

    return (
        <div className="playlist-page">
            <h2>My Favourite Songs</h2>
            <div className="music-card-par">
                {favourites.map((song, index) => (
                    <MusicCard
                        key={song._id}
                        music={song}
                        buttonContent="-"
                        onAddSong={() => handleRemoveSong(song._id)}
                        onCardClick={() => handleMusicCardClick(song, index)}
                    />
                ))}
            </div>

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

export default Favourite;
