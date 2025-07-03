import express from 'express';
import {
  getFavouritesByUserId,
  addSongToFavouritesByUser,
  removeSongFromFavouritesByUser
} from '../controllers/favourite.js';

const router = express.Router();

router.get('/user/:userId', getFavouritesByUserId);
router.put('/user/:userId/add/:musicId', addSongToFavouritesByUser);
router.put('/user/:userId/remove/:musicId', removeSongFromFavouritesByUser);

export default router;
