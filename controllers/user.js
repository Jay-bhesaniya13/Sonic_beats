
import User from '../models/user.js';

export const allUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieves all users
    console.log(users); // Log users for debugging
    res.status(200).json(users); // Send the retrieved users as the response
  } catch (error) {
    console.error('Error retrieving users:', error); // Log error for debugging
    res.status(500).json({ error: 'An error occurred while retrieving users.' });
  }
};

export const addUsers = async (req, res) => {
  try {
    let users = req.body;

    // Check if `users` is an object, and not an array
    if (!Array.isArray(users)) {
      users = [users]; // Wrap the single object in an array
    }

    // Check if the array is not empty
    if (users.length === 0) {
      return res.status(400).json({ error: 'No user data provided.' });
    }

    // Insert multiple users into the database
    await User.insertMany(users, { ordered: true });

    res.status(201).json({ message: 'Users created successfully' });
  } catch (error) {
    console.error('Error creating users:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed. Please check your input data.' });
    } else if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ error: 'Duplicate key error. Please ensure usernames and emails are unique.' });
    }

    res.status(500).json({ error: 'An error occurred while creating users.' });
  }
};


  export const delUser = async (req, res) => {
    try {
      const { username } = req.body; // Get username from the request body
  
      if (!username) {
        return res.status(400).json({ error: 'Username is required.' }); // Bad request if username is not provided
      }
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' }); // Not found if user does not exist
      }
  
      // Delete the user
      await User.deleteOne({ username });
  
      res.status(200).json({ message: 'User deleted successfully' }); // Confirm deletion
    } catch (error) {
      console.error('Error fetching and deleting user:', error); // Log error for debugging
      res.status(500).json({ error: 'An error occurred while fetching and deleting the user.' });
    }
  };
  

  