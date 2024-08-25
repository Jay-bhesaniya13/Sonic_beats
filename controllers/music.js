import Music from '../models/music.js';

// Get all tracks
export const getAllTracks = async (req, res) => {

    try {
        const tracks = await Music.find();
        res.status(200).json(tracks);
    } catch (error) {
        console.error('Error retrieving tracks:', error);
        res.status(500).json({ error: 'An error occurred while retrieving tracks.' });
    }

};
 
// Add a single or multiple tracks
export const addTrack = async (req, res) => {
  try {
    const tracks = req.body;

    // Check if the input is an array of tracks
    if (Array.isArray(tracks)) {
      // Insert multiple tracks
      await Music.insertMany(tracks);
      res.status(201).json({ message: 'Tracks added successfully' });
    } else if (typeof tracks === 'object') {
      // Insert a single track
      const newTrack = new Music(tracks);
      await newTrack.save();
      res.status(201).json({ message: 'Track added successfully', track: newTrack });
    } else {
      // Invalid data format
      res.status(400).json({ error: 'Invalid data format. Expecting an object or an array of objects.' });
    }
  } catch (error) {
    console.error('Error adding tracks:', error);
    res.status(500).json({ error: 'An error occurred while adding tracks.' });
  }
};


// Get a track by title
export const getTrackByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const track = await Music.findOne({ title });
        if (!track) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.status(200).json(track);
    } catch (error) {
        console.error('Error retrieving track:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the track.' });
    }
};

// Update a track by title with full track data
export const updateTrackByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const updateData = req.body;

        // Find the track by title
        const track = await Music.findOne({ title });

        if (!track) {
            return res.status(404).json({ error: 'Track not found' });
        }

        // Update the track with new data
        Object.assign(track, updateData);

        // Save the updated track
        await track.save();

        res.status(200).json({ message: 'Track updated successfully', track });
    } catch (error) {
        console.error('Error updating track:', error);
        res.status(500).json({ error: 'An error occurred while updating the track.' });
    }
};

// Delete a track by title
export const deleteTrackByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const deletedTrack = await Music.findOneAndDelete({ title });
        if (!deletedTrack) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.status(200).json({ message: 'Track deleted successfully' });
    } catch (error) {
        console.error('Error deleting track:', error);
        res.status(500).json({ error: 'An error occurred while deleting the track.' });
    }
};
