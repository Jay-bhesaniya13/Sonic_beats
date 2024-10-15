import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import MusicCard from './MusicCard';

const Home = () => {
    const [musicData, setMusicData] = useState([]); // Initialize as an empty array
    const navigate = useNavigate();
    
    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the Login page
    };

    const fetchMusic = async () => {
        try {
            const response = await fetch('http://localhost:3000/music');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMusicData(data);
        } catch (error) {
            console.error('Error fetching music data:', error);
        }
    };

    useEffect(() => {
        fetchMusic();
    }, []);

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
                <div>
                    {musicData.length > 0 ? ( // Check if musicData has items
                        musicData.map((music) => (
                            <MusicCard key={music._id} music={music} />
                        ))
                    ) : (
                        <p>No music available.</p> // Message if no music is fetched
                    )}
                </div>
            </div>
            <div className="center">
                <div className="music-player">
                    <audio id="audioPlayer">
                        <source src="your_audio_file.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <div className="player-controls">
                        <button id="playPauseBtn">Play</button>
                        <input type="range" id="seekSlider" value="0" max="100" />
                        <span id="currentTime">0:00</span> / <span id="duration">0:00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
