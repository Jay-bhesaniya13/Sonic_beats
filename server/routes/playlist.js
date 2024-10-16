import express from 'express';
import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  addSongPlaylistById,
  deleteSongPlaylistById,
  deletePlaylistById
} from '../controllers/playlist.js';

const router = express.Router();

router.get('/', getAllPlaylists);     //get all playlist
router.get('/:id', getPlaylistById);  //get playlist by id
router.post('/', createPlaylist);     //create new playlist 
router.put('/:id/add/:musicId', addSongPlaylistById);    // Add a song to playlist
router.put('/:id/remove/:musicId', deleteSongPlaylistById);  // Remove a song from playlist
router.delete('/:id', deletePlaylistById); //delete playlist

 


export default router;
