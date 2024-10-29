// src/routes/productRoutes.js
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsInRange
} from '../controllers/productController.js';

const router = Router();

// Rutas para los productos
router.get('/all', getAllProducts);
router.get('/:id', getProductById);
router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

// Nueva ruta para el reporte de productos hasta una fecha
router.get('/report', getProductsInRange); 
export default router;
