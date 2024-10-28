import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoriesByProductId
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/create', createCategory);
router.get('/all', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/productos/:id/categorias', getCategoriesByProductId);

export default router;
