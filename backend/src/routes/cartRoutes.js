import express from 'express';
import {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/create', createCart);
router.get('/all', getCarts);
router.get('/:id', getCartById);
router.put('/update/:id', updateCart);
router.delete('/delete/:id', deleteCart);

export default router;
