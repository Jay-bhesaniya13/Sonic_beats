import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contact_no: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  playlists: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist'
  }]
}, {
  timestamps: true
});

export default mongoose.model('Admin', adminSchema);
