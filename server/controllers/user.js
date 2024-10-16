import User from '../models/user.js';
import Playlist from '../models/playlist.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); 

// Login Function
export const login = async (req, res) => {
    const { username, password } = req.body; // Change to use username

    console.log('Login attempt:', { username, password }); // Log received username and password

    try {
        // Find user by username
        const user = await User.findOne({ username }); // Change to lookup by username
        console.log('User found:', user); // Log user data

        if (!user) {
            console.log('User not found'); // Log when user is not found
            return res.status(401).json({ msg: 'Invalid credentials' }); // User not found
        }

        // Compare the password with hashed password
        const isMatch = await bcrypt.compare(password, user.password); // Use bcrypt to compare passwords
        console.log('Password match:', isMatch); // Log password comparison result

        if (!isMatch) {
            console.log('Incorrect password'); // Log when password does not match
            return res.status(401).json({ msg: 'Invalid credentials' }); // Incorrect password
        }

        // Generate a token using jsonwebtoken
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret key from .env
            { expiresIn: '1h' } // Token expiration
        );

        console.log('Token generated:', token); // Log the generated token
        // Send token and user data in response
        res.json({
            token,
            user: { id: user._id, email: user.email, username: user.username, contact_no: user.contact_no }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    const { username, password, email, contact_no } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
            username,
            password: await bcrypt.hash(password, 10), // Hashing the password
            email,
            contact_no,
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Fetch all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Fetch a user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete a user by ID and also delete associated playlists
export const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the user exists
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the user ID before deleting playlists
        console.log(`Attempting to delete playlists for user ID: ${id}`);

        // Ensure the user ID is in ObjectId format
        const userId = mongoose.Types.ObjectId(id);

        // Delete all playlists associated with the user
        const deletedPlaylists = await Playlist.deleteMany({ user: userId });

        // Log the result of the delete operation
        console.log(`Deleted playlists count: ${deletedPlaylists.deletedCount}`);

        // Delete the user
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User and all associated playlists deleted successfully' });
    } catch (error) {
        console.error('Error deleting user and playlists:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user and their playlists' });
    }
};
