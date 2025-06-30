import React , { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the Login page
  };
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
      const fetchMusic = async () => {
          try {
              const response = await fetch('http://localhost:3000/music'); // Your API endpoint
              const data = await response.json();
              console.log(data);
              setMusicData(data);
          } catch (error) {
              console.error('Error fetching music data:', error);
          }
      };

      fetchMusic();
  }, []);

  const basePath = "/assets/";


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

          {musicData.map((music) => {
                     const fullMusicImgPath = basePath + music.musicImg;
                    const fullFilePath = basePath + music.filePath;
             
                    <div className="music-card" key={music._id}>
                    <img src={fullMusicImgPath} // Image path
                                alt={`${music.title} cover`} className="music-image" />
                    <div className="music-details">
                      <h2>{music.title}</h2>
                      <p>Artist: {music.artist}</p>
                      <p>Duration: {music.duration} s</p>
                    </div>
                  </div>
          })}


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
}

export default Home;
