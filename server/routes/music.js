import express from 'express';
import {
  getAllMusic,
  getMusicById,
  createMusic,
  updateMusicById,
  deleteMusicById
} from '../controllers/music.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

// Define routes for music operations
router.get('/', getAllMusic);
router.get('/:id', getMusicById);
router.post(
  '/',
  upload.fields([
    { name: 'musicFile', maxCount: 1 },
    { name: 'coverFile', maxCount: 1 }
  ]),
  createMusic
);

router.put('/:id', updateMusicById);
router.delete('/:id', deleteMusicById);

export default router;
