import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUserById } from '../controllers/user.js';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Create a new user
router.post('/', createUser);

// Update a user
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUserById);

export default router;
