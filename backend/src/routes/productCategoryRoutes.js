import express from 'express';
import {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
} from '../controllers/productCategoryController.js';

const router = express.Router();


router.post('/create', createProductCategory);
router.get('/all', getAllProductCategories);
router.get('/:id', getProductCategoryById);
router.put('/update/:id', updateProductCategory);
router.delete('/delete/:id', deleteProductCategory);
export default router;
