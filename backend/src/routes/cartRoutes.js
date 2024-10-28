import express from 'express';
import {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
  getPendingCart,
  createPendingCart,
  addProductToCart,
  getPendingCartItems,
  getCartItemsByCartId,
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/create', createCart);
router.get('/all', getCarts);
router.get('/:id', getCartById);
router.put('/update/:id', updateCart);
router.delete('/delete/:id', deleteCart);

// Rutas específicas para carritos PENDING
router.get('/pending/:userId', getPendingCart);
router.post('/pending/:userId', createPendingCart);
router.post('/addProduct/:userId', addProductToCart);
router.get('/pending/items/:userId', getPendingCartItems);
router.get('/by-cart/:cartId', getCartItemsByCartId); 
export default router;
