import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/user');
            const users = await response.json();

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                navigate('/');  // Navigate to home page (Home.jsx)
            } else {
                alert('Invalid username or password!');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Failed to log in. Please try again.');
        }
    };

    // Toggle password visibility
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type={showPassword ? 'text' : 'password'} // Toggle between text and password
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Checkbox to toggle password visibility */}
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="show-password-checkbox"
                            checked={showPassword}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="show-password-checkbox">Show Password</label>
                    </div>
                    <button type="submit">Login</button>
                    <button type="button" onClick={handleRegisterClick}>
                        Don't have an account? Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
