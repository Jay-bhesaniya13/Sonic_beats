import express from 'express';
import {
  createPlaylist,
  addSongToPlaylist,
  getAllPlaylists,
  getPlaylistByTitle,
  updatePlaylistTitle,
  deletePlaylist
} from '../controllers/playlist.js';

const router = express.Router();

// Create a new playlist
router.post('/create', createPlaylist);

// Add a song to a playlist
router.post('/:title/song', addSongToPlaylist);

// Get all playlists
router.get('/', getAllPlaylists);

// Get a playlist by title
router.get('/:title', getPlaylistByTitle);

// Update playlist title
router.put('/title', updatePlaylistTitle); // Use /title for updating title

// Delete a playlist by title
router.delete('/:title', deletePlaylist);

export default router;
