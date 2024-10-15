import React from "react";

const MusicCard = ({ music }) => {
    if (!music) return null; // Return null if music is undefined

    const basePath = "/assets/";
    const fullMusicImgPath = basePath + music.musicImg;
    const fullFilePath = basePath + music.filePath;

    return (
        <div className="music-card" key={music._id}>
            <img src={fullMusicImgPath} // Image path
                alt={`${music.title} cover`} className="music-image" />
            <div className="music-details">
                <h2>{music.title}</h2>
                <p>Artist: {music.artist}</p>
                <p>Duration: {music.duration} s</p>
            </div>
        </div>
    );
};

export default MusicCard;
