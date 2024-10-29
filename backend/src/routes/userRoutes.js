import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
} from '../controllers/userController.js';

const router = Router();

router.post('/create', createUser);
router.get('/all', getUsers);
router.get('/search/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.put('/updaterole/:id', updateUserRole); 

export default router;
