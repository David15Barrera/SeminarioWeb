import express from 'express';
import {
  createCartItem,
  getCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
  updateCartItemDetails,
  getTotalSalesReport
} from '../controllers/cartItemController.js';

const router = express.Router();

router.post('/create', createCartItem); //Crear un nuevo carrito
router.get('/all', getCartItems); // Obtener todos los carritos
router.get('/:id', getCartItemById); //Obtener los carritos por el id
router.put('/update/:id', updateCartItem); // Actualizar los carritos
router.delete('/delete/:id', deleteCartItem); //Eminar un carrito los carritos
router.put('/update/:id', updateCartItemDetails)
router.get('/report/sales/total', getTotalSalesReport);
export default router;
