import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
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
  },
  like: {
    type: Number,
    default: 0,  // Initialize with 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Music', musicSchema);
