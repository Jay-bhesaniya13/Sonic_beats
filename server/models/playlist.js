import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Music',  // Reference to the Music model
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,  // Ensure that a playlist is always linked to a user
  }
}, {
  timestamps: true,  // Adds createdAt and updatedAt fields
});

// Create the Playlist model
const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;
