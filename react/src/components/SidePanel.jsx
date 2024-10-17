// SidePanel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../AuthContext'; // Import useAuth to access login/logout

const SidePanel = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Get logout function from AuthContext

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/login'); // Redirect to login page
    };
    
    const handlePlaylistClick = () => {
        navigate('/playlist'); // Navigate to the Playlist page
    };
    const handleContactClick = () => {
        navigate('/contact'); // Navigate to the Playlist page
    };
    const handleSettingsClick = () => {
        navigate('/settings'); // Navigate to the Settings page
    };

    return (
        <div id="mySidepanel" className="sidepanel">
             
             <button onClick={handleLogout} >
                Logout
            </button>
             <a>Menu</a>
             
            
            <h3 onClick={handlePlaylistClick} >Playlist</h3>
            <h3 onClick={handleContactClick}>Contact</h3>
            <h3 onClick={handleSettingsClick}>Setting</h3>
        </div>
    );
};

export default SidePanel;
