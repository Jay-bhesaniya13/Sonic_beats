import React from 'react';

const MusicCard = ({ music, onClick }) => {
    if (!music) return null;

    const basePath = "/assets/";
    const fullMusicImgPath = basePath + music.musicImg;

    return (
        <div className="music-card" onClick={onClick}>
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
         </div>
    );
};

export default MusicCard;
