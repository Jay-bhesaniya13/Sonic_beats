// SidePanel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../AuthContext'; // Access login/logout

const SidePanel = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div id="mySidepanel" className="sidepanel">
            <button onClick={handleLogout}>
                Logout
            </button>

            <a onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}>
                Menu
            </a>

            <h3 onClick={() => handleNavigation('/favourite')} style={{ cursor: 'pointer' }}>
                Favourites
            </h3>
            <h3 onClick={() => handleNavigation('/contact')} style={{ cursor: 'pointer' }}>
                Contact
            </h3>
            <h3 onClick={() => handleNavigation('/settings')} style={{ cursor: 'pointer' }}>
                Settings
            </h3>
        </div>
    );
};

export default SidePanel;
