import { Router } from 'express';
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from '../controllers/roleController.js';

const router = Router();

router.post('/rolCreate', createRole);
router.get('/allRole', getRoles);
router.get('/role/:id', getRoleById);
router.put('/update/:id', updateRole);
router.delete('/delete/:id', deleteRole);

export default router;
