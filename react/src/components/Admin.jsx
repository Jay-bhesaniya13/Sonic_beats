import React, { useState, useRef } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ id: '', password: '' });
    const [formData, setFormData] = useState({ title: '', artist: '', genre: '' });
    const [musicFile, setMusicFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const musicFileRef = useRef(null);
    const coverFileRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.id === 'admin1' && loginData.password === 'admin@12') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials! Please try again.');
            setLoginData({ id: '', password: '' });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'musicFile') {
            setMusicFile(e.target.files[0]);
        } else if (e.target.name === 'coverFile') {
            setCoverFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('artist', formData.artist);
        data.append('genre', formData.genre);
        data.append('musicFile', musicFile);
        data.append('coverFile', coverFile);

        try {
            const response = await fetch('http://localhost:3000/music', {
                method: 'POST',
                body: data,
            });

            const text = await response.text();
            console.log("Raw response text:", text);

            try {
                const result = JSON.parse(text);
                console.log('Music added successfully:', result);
                alert('Music added successfully!');
                setFormData({ title: '', artist: '', genre: '' });
                setMusicFile(null);
                setCoverFile(null);
                if (musicFileRef.current) musicFileRef.current.value = '';
                if (coverFileRef.current) coverFileRef.current.value = '';
            } catch (jsonError) {
                console.error("⚠️ JSON parse failed:", jsonError);
                alert('Music added but response format error');
            }

        } catch (error) {
            console.error('Error adding music:', error);
            alert('Error adding music. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="admin-panel">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-popup">
                        <div className="loader"></div>
                        <p>Uploading music...</p>
                    </div>
                </div>
            )}

            {!isAuthenticated ? (
                <div className="login-container">
                    <div className="login-box">
                        <h2>Admin Login</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                name="id"
                                placeholder="Admin ID"
                                value={loginData.id}
                                onChange={handleLoginChange}
                                required
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                            />
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
                        </form>
                    </div>
                </div>
            ) : (
                <>
                    <h1>Admin Panel</h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="admin-form">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required disabled={isLoading} />
                        </div>
                        <div className="form-group">
                            <label>Artist</label>
                            <input type="text" name="artist" value={formData.artist} onChange={handleChange} required disabled={isLoading} />
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <input type="text" name="genre" value={formData.genre} onChange={handleChange} required disabled={isLoading} />
                        </div>
                        <div className="form-group">
                            <label>Music File (MP3)</label>
                            <input type="file" name="musicFile" accept=".mp3" onChange={handleFileChange} required disabled={isLoading} ref={musicFileRef} />
                        </div>
                        <div className="form-group">
                            <label>Cover Image (JPG/JPEG)</label>
                            <input type="file" name="coverFile" accept=".jpg,.jpeg" onChange={handleFileChange} required disabled={isLoading} ref={coverFileRef} />
                        </div>
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? 'Uploading...' : 'Submit'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Admin;
