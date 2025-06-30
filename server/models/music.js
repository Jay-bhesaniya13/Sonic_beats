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
    default: 0,
  }
}, {
  timestamps: true
});

 export default mongoose.models.Music || mongoose.model('Music', musicSchema);
