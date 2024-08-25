import express from 'express';
import { allAdmins, addAdmin, delAdmin } from '../controllers/admin.js';

const router = express.Router();

// Route to get all admins
router.get("/", allAdmins);

// Route to add a new admin
router.post("/add", addAdmin);

// Route to delete an admin
router.delete("/", delAdmin);

export default router;
