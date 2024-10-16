import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Import FontAwesome plus icon

const MusicCard = ({ music, onAddSong }) => {
    if (!music) return null;

    const basePath = "/assets/";
    const fullMusicImgPath = basePath + music.musicImg;

    return (
        <div className="music-card">
            <img 
                src={fullMusicImgPath} 
                alt={`${music.title} cover`} 
                className="music-image" 
            />
            <div className="music-details">
                <h2>{music.title}</h2>
                <p>Artist: {music.artist}</p>
                <p>Duration: {music.duration} s</p>
            </div>
            {/* Add + icon button */}
            <button className="add-song-btn" onClick={() => onAddSong(music._id)}>
                <FaPlus /> {/* Plus icon */}
            </button>
        </div>
    );
};

export default MusicCard;
