import express from 'express';
import {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
} from '../controllers/productCategoryController.js';

const router = express.Router();


router.post('/create', createProductCategory); //Crea una nueva relación entre producto y categoría
router.get('/all', getAllProductCategories); // Obtiene todas las relaciones entre productos y categorías
router.get('/:id', getProductCategoryById); // Obtiene una relación entre producto y categoría por ID
router.put('/update/:id', updateProductCategory); // Actualiza una relación entre producto y categoría
router.delete('/delete/:id', deleteProductCategory); // Elimina una relación entre producto y categoría

export default router;
