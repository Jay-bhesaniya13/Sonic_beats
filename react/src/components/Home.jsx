import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import MusicCard from './MusicCard';

const Home = () => {
    const [musicData, setMusicData] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const fetchMusic = async () => {
        try {
            const response = await fetch('http://localhost:3000/music');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Shuffle the music data
            const shuffledData = shuffleArray(data);
            setMusicData(shuffledData);
        } catch (error) {
            console.error('Error fetching music data:', error);
        }
    };

    useEffect(() => {
        fetchMusic();
    }, []);

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
        if (nextIndex < musicData.length) {
            handleMusicCardClick(musicData[nextIndex], nextIndex);
        } else {
            setIsPlaying(false);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <div id="mySidepanel" className="sidepanel">
                <button onClick={handleLoginClick}>Login</button>
                <a href="#">Menu</a>
                <ul className="panel-list">
                    <li>Genre</li>
                    <li>Explore</li>
                    <li>Albums</li>
                    <li>Artist</li>
                </ul>
                <a href="#">Library</a>
                <ul className="panel-list">
                    <li>Recent</li>
                    <li>Albums</li>
                    <li>Favorites</li>
                    <li>Local</li>
                </ul>
                <a href="#">Playlist</a>
                <a href="#">Contact</a>
            </div>
            <div className="main-content">
                <h3>Trending Music</h3>
                <div className="music-card-par">
                    {musicData.length > 0 ? (
                        musicData.map((music, index) => (
                            <MusicCard 
                                key={music._id} 
                                music={music} 
                                onClick={() => handleMusicCardClick(music, index)} 
                            />
                        ))
                    ) : (
                        <p>No music available.</p>
                    )}
                </div>
            </div>
            <div className="center">
                <div className="music-player">
                    <audio 
                        id="audioPlayer" 
                        onTimeUpdate={onTimeUpdate} 
                        onEnded={handleSongEnd}
                    >
                        <source src="" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <div className="player-controls">
                        <button id="playPauseBtn" onClick={togglePlayPause}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <input 
                            type="range" 
                            id="seekSlider" 
                            value={duration ? (currentTime / duration) * 100 : 0} 
                            onChange={handleSeek} 
                        />
                        <span id="currentTime">{formatTime(currentTime)}</span> 
                        / 
                        <span id="duration">{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Home;
