import express  from "express";
import { createUser, getUser, deleteUser, updateUserName } from '../controllers/users.js';
import { userDataValidation } from '../utils/validations.js';
const router = express.Router();

router.post('/login',createUser);
router.get('', getUser);
router.delete('', deleteUser)
router.put('', updateUserName);

export default router;