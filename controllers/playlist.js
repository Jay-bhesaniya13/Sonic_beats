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
  const { name, description, songs, user } = req.body;
  try {
    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const playlist = new Playlist({
      name,
      description,
      songs,
      user,
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Error creating playlist', error });
  }
};

// Update playlist by ID
export const updatePlaylistById = async (req, res) => {
  const { id } = req.params;
  const { name, description, songs } = req.body;
  try {
    const playlist = await Playlist.findByIdAndUpdate(id, { name, description, songs }, { new: true }).populate('songs').populate('user');
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Error updating playlist', error });
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
