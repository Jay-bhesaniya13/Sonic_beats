import express from 'express';
import {
  getAllAdmins,   
  createAdmin,    
  deleteAdmin , 
  updateAdmin
} from '../controllers/admin.js';

const router = express.Router();

// Route to get all admins
router.get('/', getAllAdmins);

// Route to create a new admin
router.post('/create', createAdmin);

// Route to delete an admin
router.delete('/delete', deleteAdmin);

// Route to update an admin
router.put('/update', updateAdmin);

export default router;
