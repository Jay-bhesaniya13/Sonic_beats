import Music from '../models/music.js';
import Playlist from '../models/playlist.js';
import path from 'path';
import { parseFile } from 'music-metadata';


// Get all music tracks
export const getAllMusic = async (req, res) => {
  try {
    const musicTracks = await Music.find();
    res.status(200).json(musicTracks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching music tracks', error });
  }
};

// Get music by ID
export const getMusicById = async (req, res) => {
  const { id } = req.params;
  try {
    const musicTrack = await Music.findById(id);
    if (!musicTrack) {
      return res.status(404).json({ message: 'Music track not found' });
    }
    res.status(200).json(musicTrack);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching music track', error });
  }
};

     
export const createMusic = async (req, res) => {
  try {
    const { title, artist, genre } = req.body;

    const musicFile = req.files?.musicFile?.[0];
    const coverFile = req.files?.coverFile?.[0];

    if (!musicFile || !coverFile) {
      return res.status(400).json({ message: 'Both music and cover files are required.' });
    }

    // Get duration from MP3 file
    const metadata = await parseFile(musicFile.path);
    const durationSeconds = Math.round(metadata.format.duration); // round to nearest second

    const musicImg = path.basename(coverFile.path);  // Save just filename
    const filePath = path.basename(musicFile.path);  // Save just filename

    const musicTrack = new Music({
      title,
      artist,
      duration: durationSeconds,
      genre,
      musicImg,
      filePath
    });

    await musicTrack.save();

    res.status(201).json({ message: "Music track created", data: musicTrack });
  } catch (error) {
    console.error('Error creating music track:', error);
    res.status(500).json({ message: 'Error creating music track', error: error.message });
  }
};


// Update music by ID
export const updateMusicById = async (req, res) => {
  const { id } = req.params;
  const { title, artist, duration, musicImg, filePath, genre } = req.body;
  try {
    const musicTrack = await Music.findByIdAndUpdate(id, { title, artist, duration, musicImg, filePath, genre }, { new: true });
    if (!musicTrack) {
      return res.status(404).json({ message: 'Music track not found' });
    }
    res.status(200).json(musicTrack);
  } catch (error) {
    res.status(500).json({ message: 'Error updating music track', error });
  }
};


// Delete music by ID and remove it from all playlists
export const deleteMusicById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete the music track
    const musicTrack = await Music.findByIdAndDelete(id);
    if (!musicTrack) {
      return res.status(404).json({ message: 'Music track not found' });
    }

    // Remove the deleted track from all playlists
    await Playlist.updateMany(
      { songs: id },  // Find playlists that contain this song
      { $pull: { songs: id } }  // Remove the song from the songs array
    );

    res.status(200).json({ message: 'Music track and related references deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting music track', error });
  }
};
