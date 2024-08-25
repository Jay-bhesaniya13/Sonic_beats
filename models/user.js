
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Ensure usernames are unique
  },
  password: {
    type: String,
    required: true
  },
  contact_no: {
    type: String,
    required: true // Optional field
  },
  email: {
    type: String,
    required: true, // Optional field
    unique: true // Ensure emails are unique
  }
}, {
  timestamps: true //  adds createdAt and updatedAt fields
});

// Create the User model
 

export default mongoose.model('User', userSchema);
