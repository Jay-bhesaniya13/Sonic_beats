import Playlist from '../models/playlist.js';
import Music from '../models/music.js'; // To validate track existence

// Create a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const { title, tracks, user_id } = req.body;

    // Validate that all tracks exist
    const trackDocs = await Music.find({ '_id': { $in: tracks } });
    if (trackDocs.length !== tracks.length) {
      return res.status(400).json({ error: 'One or more tracks do not exist.' });
    }

    // Ensure no other playlist with the same title exists
    const existingPlaylist = await Playlist.findOne({ title });
    if (existingPlaylist) {
      return res.status(400).json({ error: 'A playlist with this title already exists.' });
    }

    // Create a new playlist
    const newPlaylist = new Playlist({ title, tracks, user_id });
    await newPlaylist.save();

    res.status(201).json({ message: 'Playlist created successfully', playlist: newPlaylist });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'An error occurred while creating the playlist.' });
  }
};

// Get all playlists
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('tracks').populate('user_id');
    res.status(200).json(playlists);
  } catch (error) {
    console.error('Error retrieving playlists:', error);
    res.status(500).json({ error: 'An error occurred while retrieving playlists.' });
  }
};

// Get a playlist by title
export const getPlaylistByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const playlist = await Playlist.findOne({ title }).populate('tracks').populate('user_id');

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found.' });
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.error('Error retrieving playlist:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the playlist.' });
  }
};

// Update a playlist by title
export const updatePlaylist = async (req, res) => {
  try {
    const { title } = req.params;
    const { newTitle, tracks, user_id } = req.body;

    // Validate that all tracks exist
    const trackDocs = await Music.find({ '_id': { $in: tracks } });
    if (trackDocs.length !== tracks.length) {
      return res.status(400).json({ error: 'One or more tracks do not exist.' });
    }

    // Find the playlist by title
    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { title },
      { title: newTitle || title, tracks, user_id },
      { new: true } // Return the updated document
    ).populate('tracks').populate('user_id');

    if (!updatedPlaylist) {
      return res.status(404).json({ error: 'Playlist not found.' });
    }

    res.status(200).json({ message: 'Playlist updated successfully', playlist: updatedPlaylist });
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({ error: 'An error occurred while updating the playlist.' });
  }
};

// Delete a playlist by title
export const deletePlaylist = async (req, res) => {
  try {
    const { title } = req.params;
    const deletedPlaylist = await Playlist.findOneAndDelete({ title });

    if (!deletedPlaylist) {
      return res.status(404).json({ error: 'Playlist not found.' });
    }

    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ error: 'An error occurred while deleting the playlist.' });
  }
};
