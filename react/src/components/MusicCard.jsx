import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Import FontAwesome plus and minus icons

const MusicCard = ({ music, onAddSong, buttonContent, onCardClick }) => {
    if (!music) return null;

    const basePath = "/assets/";
    const fullMusicImgPath = basePath + music.musicImg;

    return (
        <div className="music-card" onClick={onCardClick}> {/* Add onClick here */}
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
            <button className="add-song-btn" onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click when adding song
                onAddSong(music._id);
            }}>
                {buttonContent === '-' ? <FaMinus /> : <FaPlus />}
            </button>
        </div>
    );
};


export default MusicCard;
