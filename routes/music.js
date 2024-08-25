import express from 'express';
import {
  getAllTracks,
  addTrack,
  getTrackByTitle,
  updateTrackByTitle,
  deleteTrackByTitle
} from '../controllers/music.js';

const router = express.Router();

router.get('/', getAllTracks); // Get all tracks
router.post('/add', addTrack); // Add a new track
router.get('/:title', getTrackByTitle); // Get a track by title
router.put('/:title', updateTrackByTitle); // Update a track by title
router.delete('/:title', deleteTrackByTitle); // Delete a track by title

export default router;
