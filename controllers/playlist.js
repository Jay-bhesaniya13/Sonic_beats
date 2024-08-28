import Playlist from '../models/playlist.js';
import Music from '../models/music.js'; // To validate track existence
import Admin from '../models/admin.js'; // Ensure Admin model is imported

// Create a new playlist
export const createPlaylist = async (req, res) => {
  const playlistData = req.body;
  
  try {
    const newPlaylist = new Playlist(playlistData);
    await newPlaylist.save();

    // Update the Admin model to include this playlist
    await Admin.findByIdAndUpdate(playlistData.admin_id, { $push: { playlists: newPlaylist._id } });

    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Error creating playlist', error });
  }
};

// Get all playlists
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('tracks').populate('admin_id');
    res.status(200).json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ message: 'Error fetching playlists', error });
  }
};

// Get a playlist by title
export const getPlaylistByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const playlist = await Playlist.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') } // Case-insensitive search
    }).populate('tracks').populate('admin_id');
    
    if (playlist) {
      res.status(200).json(playlist);
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ message: 'Error fetching playlist', error });
  }
};

// Update playlist title
export const updatePlaylistTitle = async (req, res) => {
  const { oldTitle, newTitle } = req.body;

  try {
    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { title: { $regex: new RegExp(`^${oldTitle}$`, 'i') } }, // Case-insensitive search
      { title: newTitle },
      { new: true } // Return the updated document
    ).populate('tracks').populate('admin_id');
    
    if (updatedPlaylist) {
      res.status(200).json(updatedPlaylist);
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error updating playlist title:', error);
    res.status(500).json({ message: 'Error updating playlist title', error });
  }
};

// Add a song to a playlist
export const addSongToPlaylist = async (req, res) => {
  const { title } = req.params;
  const { songId } = req.body;

  try {
    // Validate if the song exists
    const song = await Music.findById(songId);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { title: { $regex: new RegExp(`^${title}$`, 'i') } }, // Case-insensitive search
      { $addToSet: { tracks: songId } }, // Add songId to tracks array, ensuring no duplicates
      { new: true } // Return the updated document
    ).populate('tracks').populate('admin_id');
    
    if (updatedPlaylist) {
      res.status(200).json(updatedPlaylist);
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({ message: 'Error adding song to playlist', error });
  }
};

// Delete a song from a playlist
export const deleteSongFromPlaylist = async (req, res) => {
  const { title } = req.params;
  const { songId } = req.body;

  try {
    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { title: { $regex: new RegExp(`^${title}$`, 'i') } }, // Case-insensitive search
      { $pull: { tracks: songId } }, // Remove songId from tracks array
      { new: true } // Return the updated document
    ).populate('tracks').populate('admin_id');
    
    if (updatedPlaylist) {
      res.status(200).json(updatedPlaylist);
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error deleting song from playlist:', error);
    res.status(500).json({ message: 'Error deleting song from playlist', error });
  }
};

// Delete a playlist by title
export const deletePlaylist = async (req, res) => {
  const { title } = req.params;

  try {
    const deletedPlaylist = await Playlist.findOneAndDelete({
      title: { $regex: new RegExp(`^${title}$`, 'i') } // Case-insensitive search
    });

    if (deletedPlaylist) {
      // Optionally, remove the playlist from the Admin's playlists array
      await Admin.findByIdAndUpdate(deletedPlaylist.admin_id, { $pull: { playlists: deletedPlaylist._id } });

      res.status(200).json({ message: 'Playlist deleted successfully' });
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ message: 'Error deleting playlist', error });
  }
};
