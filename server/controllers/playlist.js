import Playlist from '../models/playlist.js';
import Music from '../models/music.js';
import User from '../models/user.js';

// Get all playlists
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs').populate('user');
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlists', error });
  }
};

// Get playlist by ID
export const getPlaylistById = async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findById(id).populate('songs').populate('user');
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlist', error });
  }
};

// Create a new playlist
export const createPlaylist = async (req, res) => {
  const { name, description, songs, userId } = req.body;
  try {
    console.log("userId in controller:", userId);
    
    // Find the user to ensure they exist
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      console.error('User not found:', userId);
      return res.status(404).json({ message: 'User not found in controller' });
    }
    
    // Create a new playlist with 'user' field
    const playlist = new Playlist({
      name,
      description,
      songs,
      user: userId, // Correctly reference 'user'
    });
    console.log("Playlist before save:", playlist);
    
    // Save the new playlist
    await playlist.save();
    
    // Add the new playlist's ID to the user's playlists array
    foundUser.playlists.push(playlist._id);
    await foundUser.save();
    
    console.log("Playlist created successfully:", playlist);
    res.status(201).json(playlist);
    
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Error creating playlist', error: error.message });
  }
};


// Add a song to the playlist by ID
export const addSongPlaylistById = async (req, res) => {
  const { id, musicId } = req.params;

  try {
    // Find the playlist by its ID
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Check if the song is already in the playlist
    if (playlist.songs.includes(musicId)) {
      return res.status(400).json({ message: 'Song already in playlist' });
    }

    // Add the song to the playlist
    playlist.songs.push(musicId);
    await playlist.save();

    res.status(200).json({ message: 'Song added to playlist', playlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song to playlist', error });
  }
};

// Delete a song from the playlist by ID
export const deleteSongPlaylistById = async (req, res) => {
  const { id, musicId } = req.params;

  try {
    // Find the playlist by its ID
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Check if the song exists in the playlist
    const songIndex = playlist.songs.indexOf(musicId);
    if (songIndex === -1) {
      return res.status(404).json({ message: 'Song not found in playlist' });
    }

    // Remove the song from the playlist
    playlist.songs.splice(songIndex, 1);
    await playlist.save();

    res.status(200).json({ message: 'Song removed from playlist', playlist });
  } catch (error) {
    res.status(500).json({ message: 'Error removing song from playlist', error });
  }
};


// Delete playlist by ID
export const deletePlaylistById = async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playlist', error });
  }
};
