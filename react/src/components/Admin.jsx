import React, { useState } from 'react';
import "../App.css"; // Assuming you already have this file for general styles

const Admin = () => {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        duration: '',
        genre: ''
    });
    const [musicFile, setMusicFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

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
        const data = new FormData();
        data.append('title', formData.title);
        data.append('artist', formData.artist);
        data.append('duration', formData.duration);
        data.append('genre', formData.genre);
        data.append('musicFile', musicFile);  // Append music file
        data.append('coverFile', coverFile);  // Append cover image

        try {

            console.log("Req.b0dy react:"+data.get('title'))
    const response = await fetch('http://localhost:3000/music', {
        method: 'POST',
        body: data,
    });

    const text = await response.text(); // instead of .json()
    console.log("Raw response text:", text);

    try {
        const result = JSON.parse(text);
        console.log('Music added successfully:', result);
    } catch (jsonError) {
        console.error("⚠️ JSON parse failed:", jsonError);
    }

} catch (error) {
    console.error('Error adding music:', error);
}

    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="admin-form">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Artist</label>
                    <input type="text" name="artist" value={formData.artist} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Duration (in seconds)</label>
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Music File (MP3)</label>
                    <input type="file" name="musicFile" accept=".mp3" onChange={handleFileChange} required />
                </div>
                <div className="form-group">
                    <label>Cover Image (JPG/JPEG)</label>
                    <input type="file" name="coverFile" accept=".jpg,.jpeg" onChange={handleFileChange} required />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default Admin;
