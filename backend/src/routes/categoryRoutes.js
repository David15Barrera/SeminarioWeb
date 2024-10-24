import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/create', createCategory); // Ruta para crear una nueva categoría
router.get('/all', getAllCategories); // Ruta para obtener todas las categorías
router.get('/:id', getCategoryById); // Ruta para obtener una categoría por ID
router.put('/update/:id', updateCategory); // Ruta para actualizar una categoría
router.delete('/delete/:id', deleteCategory); // Ruta para eliminar una categoría

export default router;
