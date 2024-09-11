import express from 'express';
import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylistById,
  deletePlaylistById
} from '../controllers/playlist.js';

const router = express.Router();

// Define routes for playlist operations
router.get('/', getAllPlaylists);
router.get('/:id', getPlaylistById);
router.post('/', createPlaylist);
router.put('/:id', updatePlaylistById);
router.delete('/:id', deletePlaylistById);

export default router;
