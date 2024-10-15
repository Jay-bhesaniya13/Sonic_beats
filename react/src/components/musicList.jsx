import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const MusicList = () => {
     const [musicData, setMusicData] = useState();
    const navigate = useNavigate();
    const handleLoginClick = () => {
      navigate('/login'); // Navigate to the Login page
    };


    const fetchMusic = async () => {
        try {
            const response = await fetch('http://localhost:3000/music'); // Your API endpoint
            const data = await response.json();
            // console.log(data);
            setMusicData(data);
            console.log(musicData);
        } catch (error) {
            console.error('Error fetching music data:', error);
        }
    };


    useEffect(() => {
        fetchMusic();
    }, []);

    // Base path to your assets
    const basePath = "/assets/";

    // return (
    //     <div>
 
    //         <h1>Music List</h1>
    //         <ul>
    //             {musicData.map((music) => {
    //                 // Construct full paths for music files and images
    //                 const fullMusicImgPath = basePath + music.musicImg;
    //                 const fullFilePath = basePath + music.filePath;

    //                 return (
    //                     <li key={music._id}>
    //                         <h2>{music.title}</h2>
    //                         <p>Artist: {music.artist}</p>
    //                         <p>Duration: {music.duration} seconds</p>
    //                         <p>Genre: {music.genre}</p>
    //                         <img
    //                             src={fullMusicImgPath} // Image path
    //                             alt={`${music.title} cover`}
    //                             style={{ width: '150px', height: 'auto' }}
    //                         />
    //                         <audio controls>
    //                             <source
    //                                 src={fullFilePath} // Audio path
    //                                 type="audio/mp3"
    //                             />
    //                             Your browser does not support the audio tag.
    //                         </audio>
    //                     </li>
    //                 );
    //             })}
    //         </ul>
    //     </div>
    // );

    
};

export default MusicList;
