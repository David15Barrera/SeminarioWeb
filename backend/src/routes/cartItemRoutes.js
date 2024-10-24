import express from 'express';
import {
  createCartItem,
  getCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} from '../controllers/cartItemController.js';

const router = express.Router();

router.post('/create', createCartItem); //Crear un nuevo carrito
router.get('/all', getCartItems); // Obtener todos los carritos
router.get('/:id', getCartItemById); //Obtener los carritos por el id
router.put('/update/:id', updateCartItem); // Actualizar los carritos
router.delete('/delete/:id', deleteCartItem); //Eminar un carrito los carritos

export default router;
