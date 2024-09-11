import express from 'express';
import {
  getAllMusic,
  getMusicById,
  createMusic,
  updateMusicById,
  deleteMusicById
} from '../controllers/music.js';

const router = express.Router();

// Define routes for music operations
router.get('/', getAllMusic);
router.get('/:id', getMusicById);
router.post('/', createMusic);
router.put('/:id', updateMusicById);
router.delete('/:id', deleteMusicById);

export default router;
