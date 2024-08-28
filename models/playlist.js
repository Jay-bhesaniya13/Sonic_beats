import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  tracks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Music' // Reference to the Music collection
  }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true
  },
  admin_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Reference to the Admin collection
    required: true // Ensures that a playlist must be associated with an admin
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

export default mongoose.model('Playlist', playlistSchema);
