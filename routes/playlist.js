import express from 'express';
import { createPlaylist, getAllPlaylists, getPlaylistByTitle, updatePlaylist, deletePlaylist } from '../controllers/playlist.js';

const router = express.Router();

router.post('/create', createPlaylist); // Create a new playlist
router.get('/', getAllPlaylists); // Get all playlists
router.get('/:title', getPlaylistByTitle); // Get a playlist by title
router.put('/:title', updatePlaylist); // Update a playlist by title
router.delete('/:title', deletePlaylist); // Delete a playlist by title

export default router;
