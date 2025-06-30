import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUserById , getUserById,login} from '../controllers/user.js';

const router = express.Router();


 
router.post('/login',login)
// Get all users
router.get('/', getAllUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Create a new user
router.post('/', createUser);

// Update a user
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUserById);

export default router;
