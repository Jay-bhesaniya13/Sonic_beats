import User from '../models/user.js';
import Favourite from '../models/favourite.js'; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); 

// Login Function
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                contact_no: user.contact_no
            }
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
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            password: await bcrypt.hash(password, 10),
            email,
            favourites:[] ,
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

// Update a user (used for changing password too)
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete user and associated favourites
export const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = mongoose.Types.ObjectId(id);

        // ✅ Delete all favourites instead of favourites
        const deletedFavourites = await Favourite.deleteMany({ user: userId });

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: 'User and all associated favourites deleted successfully',
            deletedFavourites: deletedFavourites.deletedCount
        });
    } catch (error) {
        console.error('Error deleting user and favourites:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user and their favourites' });
    }
};
