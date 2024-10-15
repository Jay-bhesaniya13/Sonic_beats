import React from "react";
import "../App.css"
import { useNavigate } from "react-router-dom";
import MusicList from "./musicList";

const Dashboard = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the Login page
  };

  
  return (
    <div>
      <MusicList/>
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
          {Array(7).fill(null).map((_, index) => (
            <div className="music-card" key={index}>
              <img src="./assets/abc.jpg" alt="Music Image" className="music-image" />
              <div className="music-details">
                <h2>Music Title</h2>
                <p>Artist Name</p>
                <p>Album Name</p>
              </div>
            </div>
          ))}
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

export default Dashboard;
