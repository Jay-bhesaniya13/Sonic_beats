import express from 'express';
import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylistById,
  deletePlaylistById
} from '../controllers/playlist.js';

const router = express.Router();

router.get('/', getAllPlaylists);     //get all playlist
router.get('/:id', getPlaylistById);  //get playlist by id
router.post('/', createPlaylist);     //create new playlist 
router.put('/:id', updatePlaylistById);//update playlist
router.delete('/:id', deletePlaylistById); //delete playlist

export default router;
