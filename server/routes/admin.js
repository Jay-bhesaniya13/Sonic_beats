import express from 'express';
import { getAllAdmins, createAdmin, updateAdmin, deleteAdminById } from '../controllers/admin.js';

const router = express.Router();

// Get all admins
router.get('/', getAllAdmins);

// Create a new admin
router.post('/', createAdmin);

// Update an admin
router.put('/:id', updateAdmin);

// Delete an admin by ID
router.delete('/:id', deleteAdminById);

export default router;
