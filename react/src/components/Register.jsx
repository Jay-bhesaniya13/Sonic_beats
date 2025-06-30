import React, { useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Single state for both passwords


    const navigate = useNavigate();

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();

        // Basic validation: Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const userData = {
            username,
            email,
            password,
            contact_no: contactNo,
        };

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('Registration successful!');
                navigate("/")
            } else {
                console.error('Registration failed.');
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Signup</h2>
                <form onSubmit={handleSignUpSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Contact No."
                        name="contactNo"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                    />
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            placeholder="Confirm Password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {/* Single checkbox to toggle both passwords */}
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="show-password"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="show-password">Show Passwords</label>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
