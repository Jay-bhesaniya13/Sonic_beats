import React from 'react';

const MusicPlayer = ({
    currentTrack,
    isPlaying,
    togglePlayPause,
    currentTime,
    duration,
    handleSeek,
    formatTime,
    onTimeUpdate,
    handleSongEnd
}) => {
    

    return (
        
        <div className="center">
            <div className="music-player">
                {currentTrack && (
                    <div className="current-track-title">
                        <h5>Track: {currentTrack.title}</h5>
                        <p>Artist: {currentTrack.artist}</p>
                    </div>
                )}
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
    );
};

export default MusicPlayer;