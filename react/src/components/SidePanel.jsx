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
    return (
        <div id="mySidepanel" className="sidepanel">
             <a href="#">Menu</a>
             <button onClick={handleLogout} style={{ margin: '20px', padding: '10px' }}>
                Logout
            </button>
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
    );
};

export default SidePanel;
