 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import MainContent from './MainContent';
import MusicPlayer from './MusicPlayer';
import SidePanel from './Sidepanel';
import { useAuth } from '../AuthContext'; // Import useAuth to access login/logout

const Home = () => {
    const [musicData, setMusicData] = useState([]);
    const [filteredMusic, setFilteredMusic] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userData, setUserData] = useState(null); // State to hold user data
    const navigate = useNavigate();
    const { logout } = useAuth(); // Get logout function from AuthContext

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
            const shuffledData = shuffleArray(data);
            setMusicData(shuffledData);
            setFilteredMusic(shuffledData);
        } catch (error) {
            console.error('Error fetching music data:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        const storedUserData = localStorage.getItem('userData');
    
        if (storedUserData) {
            try {
                console.log(storedUserData)
                const user = JSON.parse(storedUserData);
                setUserData(user);
            } catch (error) {
                console.error('Failed to parse user data:', error);
                localStorage.removeItem('userData'); // Clear invalid data
            }
        }
    
        if (!token) {
            navigate('/login'); // Redirect to login if not authenticated
        }
        
        fetchMusic();
    }, [navigate]);
    
    const handleMusicCardClick = (music, index) => {
        const audioPlayer = document.getElementById('audioPlayer');
        console.log("123")
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
        if (nextIndex < filteredMusic.length) {
            handleMusicCardClick(filteredMusic[nextIndex], nextIndex);
        } else {
            setIsPlaying(false);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSearchIconClick = () => {
        setShowSearch(!showSearch);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = musicData.filter((music) =>
            music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            music.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMusic(filtered);
        setShowSearch(false);
    };

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/login'); // Redirect to login page
    };

    const trendingMusic = filteredMusic.slice(0, 7);
    const bhajanMusic = filteredMusic.filter(music => music.genre === 'Bhajan');
    const popMusic = filteredMusic.filter(music => music.genre === 'Pop' || music.genre === 'Party');
    const aartiMusic = filteredMusic.filter(music => music.genre === 'Aarti');

    return (
        <div>
            <SidePanel />

            {/* User Information Display */}
            {userData && (
                <div className="user-info">
                    <h3>Welcome, {userData.username}!</h3> {/* Display username */}
                    <p>Email: {userData.email}</p> {/* Display email */}
                    <p>Contact Number: {userData.contact_no}</p> {/* Display contact number */}
                </div>
            )}

            {/* Logout Button */}
            <button onClick={handleLogout}>Logout</button>

            {/* Main Content Area */}
            <MainContent
                trendingMusic={trendingMusic}
                bhajanMusic={bhajanMusic}
                popMusic={popMusic}
                aartiMusic={aartiMusic}
                showSearch={showSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                handleSearchIconClick={handleSearchIconClick}
                handleMusicCardClick={handleMusicCardClick}
            />

            {/* Music Player */}
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

export default Home;