import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  musicImg: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create the Music model
const Music = mongoose.model('Music', musicSchema);

export default Music;
