import express from 'express';
import { allUsers,addUsers, delUser} from '../controllers/user.js';

const router = express.Router();

router.get("/",allUsers);
router.post("/add",addUsers);
router.delete("/",delUser);
 
 export default router;
