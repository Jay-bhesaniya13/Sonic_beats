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
  
}, {
  timestamps: true
});

export default mongoose.model('Admin', adminSchema);
